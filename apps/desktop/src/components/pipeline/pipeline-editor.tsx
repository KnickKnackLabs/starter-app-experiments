import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  type Connection,
  Controls,
  type Edge,
  MiniMap,
  type Node,
  type OnConnect,
  type OnEdgesChange,
  type OnNodeDrag,
  type OnNodesChange,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo, useRef, useState } from "react";
import { BlackboxNode } from "./blackbox-node";
import { type DragState, PipelineContext } from "./pipeline-context";
import { type BlackboxNodeData, canFillSlot } from "./types";

// Define nodeTypes outside component to avoid React Flow warning
const nodeTypes = {
  blackbox: BlackboxNode,
};

type PipelineEditorProps = {
  initialNodes?: Node<BlackboxNodeData>[];
  initialEdges?: Edge[];
};

export function PipelineEditor({
  initialNodes = [],
  initialEdges = [],
}: PipelineEditorProps) {
  const [nodes, setNodes] = useState<Node<BlackboxNodeData>[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [dragState, setDragState] = useState<DragState>(null);

  // Store refs to slot DOM elements for accurate overlap detection
  const slotRefsMap = useRef<Map<string, HTMLElement>>(new Map());

  const registerSlotRef = useCallback(
    (parentNodeId: string, slotId: string, element: HTMLElement | null) => {
      const key = `${parentNodeId}:${slotId}`;
      if (element) {
        slotRefsMap.current.set(key, element);
      } else {
        slotRefsMap.current.delete(key);
      }
    },
    []
  );

  const getSlotRefs = useCallback(() => slotRefsMap.current, []);

  // Create a lookup function for node data (used by slots to render nested nodes)
  const getNodeData = useCallback(
    (nodeId: string): BlackboxNodeData | undefined =>
      nodes.find((n) => n.id === nodeId)?.data,
    [nodes]
  );

  // Find all node IDs that are slotted inside other nodes
  const slottedNodeIds = useMemo(() => {
    const ids = new Set<string>();
    for (const node of nodes) {
      if (node.data.slots) {
        for (const slot of node.data.slots) {
          if (slot.filledBy) {
            ids.add(slot.filledBy);
          }
        }
      }
    }
    return ids;
  }, [nodes]);

  // Filter out slotted nodes from canvas rendering
  const visibleNodes = useMemo(
    () => nodes.filter((n) => !slottedNodeIds.has(n.id)),
    [nodes, slottedNodeIds]
  );

  // Handle filling a slot with a node
  const handleSlotFill = useCallback(
    (parentNodeId: string, slotId: string, nodeId: string) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== parentNodeId || !node.data.slots) {
            return node;
          }
          return {
            ...node,
            data: {
              ...node.data,
              slots: node.data.slots.map((slot) =>
                slot.id === slotId ? { ...slot, filledBy: nodeId } : slot
              ),
            },
          };
        })
      );
    },
    []
  );

  // Handle removing a node from a slot
  const handleSlotClear = useCallback(
    (parentNodeId: string, slotId: string) => {
      setNodes((nds) => {
        // Find the node being ejected
        const parentNode = nds.find((n) => n.id === parentNodeId);
        const ejectedNodeId = parentNode?.data.slots?.find(
          (s) => s.id === slotId
        )?.filledBy;

        return nds.map((node) => {
          // Deselect the parent node and clear the slot
          if (node.id === parentNodeId) {
            return {
              ...node,
              selected: false,
              data: {
                ...node.data,
                slots: node.data.slots?.map((slot) =>
                  slot.id === slotId ? { ...slot, filledBy: undefined } : slot
                ),
              },
            };
          }
          // Select the ejected node so user can immediately drag it
          if (node.id === ejectedNodeId) {
            return { ...node, selected: true };
          }
          // Deselect any other nodes
          if (node.selected) {
            return { ...node, selected: false };
          }
          return node;
        });
      });
    },
    []
  );

  // Context value for nodes to access
  const contextValue = useMemo(
    () => ({
      getNodeData,
      onSlotClear: handleSlotClear,
      dragState,
      registerSlotRef,
      getSlotRefs,
    }),
    [getNodeData, handleSlotClear, dragState, registerSlotRef, getSlotRefs]
  );

  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      setNodes(
        (nds) => applyNodeChanges(changes, nds) as Node<BlackboxNodeData>[]
      ),
    []
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Validate connections: only allow matching types or "any" type
  const isValidConnection = useCallback(
    (connection: Connection) => {
      const sourceNode = nodes.find((n) => n.id === connection.source);
      const targetNode = nodes.find((n) => n.id === connection.target);

      if (!(sourceNode && targetNode)) {
        return false;
      }

      const sourcePort = sourceNode.data.outputs.find(
        (o) => o.id === connection.sourceHandle
      );
      const targetPort = targetNode.data.inputs.find(
        (i) => i.id === connection.targetHandle
      );

      if (!(sourcePort && targetPort)) {
        return false;
      }

      // Allow connection if types match, or either is "any"
      return (
        sourcePort.type === targetPort.type ||
        sourcePort.type === "any" ||
        targetPort.type === "any"
      );
    },
    [nodes]
  );

  // When drag starts, compute which slots this node can fill
  const onNodeDragStart: OnNodeDrag<Node<BlackboxNodeData>> = useCallback(
    (_event, draggedNode) => {
      const compatibleSlots: NonNullable<DragState>["compatibleSlots"] = [];

      for (const node of nodes) {
        if (node.id === draggedNode.id || !node.data.slots) {
          continue;
        }

        for (const slot of node.data.slots) {
          if (
            !slot.filledBy &&
            canFillSlot(
              slot.accepts,
              draggedNode.data.inputs,
              draggedNode.data.outputs
            )
          ) {
            compatibleSlots.push({ parentNodeId: node.id, slot });
          }
        }
      }

      setDragState({
        nodeId: draggedNode.id,
        nodeData: draggedNode.data,
        compatibleSlots,
        overlappingSlotKeys: new Set(),
      });
    },
    [nodes]
  );

  // Update overlap state during drag using actual slot DOM positions
  const onNodeDrag: OnNodeDrag<Node<BlackboxNodeData>> = useCallback(
    (event, _draggedNode) => {
      const overlappingSlotKeys = new Set<string>();

      // Get mouse position from the event
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // Check each registered slot ref
      for (const [key, element] of slotRefsMap.current) {
        const rect = element.getBoundingClientRect();

        // Check if mouse is within the slot bounds
        if (
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom
        ) {
          overlappingSlotKeys.add(key);
        }
      }

      setDragState((prev) => {
        if (!prev) {
          return prev;
        }
        return { ...prev, overlappingSlotKeys };
      });
    },
    []
  );

  // Check if a dragged node overlaps with a slot and can fill it
  const onNodeDragStop: OnNodeDrag<Node<BlackboxNodeData>> = useCallback(
    (event, draggedNode) => {
      // Get the current overlapping slots before clearing drag state
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // Find the slot under the mouse
      for (const [key, element] of slotRefsMap.current) {
        const rect = element.getBoundingClientRect();

        if (
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom
        ) {
          // Parse the key to get parentNodeId and slotId
          const [parentNodeId, slotId] = key.split(":");
          const parentNode = nodes.find((n) => n.id === parentNodeId);
          const slot = parentNode?.data.slots?.find((s) => s.id === slotId);

          // Check if this slot can accept the dragged node
          if (
            slot &&
            !slot.filledBy &&
            canFillSlot(
              slot.accepts,
              draggedNode.data.inputs,
              draggedNode.data.outputs
            )
          ) {
            handleSlotFill(parentNodeId, slotId, draggedNode.id);
            setDragState(null);
            return;
          }
        }
      }

      // No valid slot found, just clear the drag state
      setDragState(null);
    },
    [nodes, handleSlotFill]
  );

  return (
    <PipelineContext.Provider value={contextValue}>
      <div className="h-full w-full">
        <ReactFlow
          edges={edges}
          fitView
          isValidConnection={isValidConnection}
          nodes={visibleNodes}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          onEdgesChange={onEdgesChange}
          onNodeDrag={onNodeDrag}
          onNodeDragStart={onNodeDragStart}
          onNodeDragStop={onNodeDragStop}
          onNodesChange={onNodesChange}
          snapGrid={[16, 16]}
          snapToGrid
        >
          <Background gap={16} size={1} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </PipelineContext.Provider>
  );
}
