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
import { useCallback, useMemo, useState } from "react";
import { BlackboxNode } from "./blackbox-node";
import { PipelineContext } from "./pipeline-context";
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
                slot.id === slotId ? { ...slot, filledBy: undefined } : slot
              ),
            },
          };
        })
      );
    },
    []
  );

  // Context value for nodes to access
  const contextValue = useMemo(
    () => ({
      getNodeData,
      onSlotClear: handleSlotClear,
    }),
    [getNodeData, handleSlotClear]
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

  // Check if a dragged node overlaps with a slotted node and can fill its slot
  const onNodeDragStop: OnNodeDrag<Node<BlackboxNodeData>> = useCallback(
    (_event, draggedNode) => {
      // Find nodes with empty slots
      const nodesWithEmptySlots = nodes.filter(
        (n) =>
          n.id !== draggedNode.id &&
          n.data.slots?.some((slot) => !slot.filledBy)
      );

      // Check overlap with each potential target
      for (const targetNode of nodesWithEmptySlots) {
        // Simple bounding box overlap check
        const draggedBounds = {
          left: draggedNode.position.x,
          right: draggedNode.position.x + 120, // approximate width
          top: draggedNode.position.y,
          bottom: draggedNode.position.y + 60, // approximate height
        };

        const targetBounds = {
          left: targetNode.position.x,
          right: targetNode.position.x + 200, // nodes with slots are wider
          top: targetNode.position.y,
          bottom: targetNode.position.y + 120,
        };

        const overlaps =
          draggedBounds.left < targetBounds.right &&
          draggedBounds.right > targetBounds.left &&
          draggedBounds.top < targetBounds.bottom &&
          draggedBounds.bottom > targetBounds.top;

        if (overlaps) {
          // Find the first empty slot that accepts this node
          const emptySlot = targetNode.data.slots?.find(
            (slot) =>
              !slot.filledBy &&
              canFillSlot(
                slot.accepts,
                draggedNode.data.inputs,
                draggedNode.data.outputs
              )
          );

          if (emptySlot) {
            handleSlotFill(targetNode.id, emptySlot.id, draggedNode.id);
            return; // Only fill one slot
          }
        }
      }
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
