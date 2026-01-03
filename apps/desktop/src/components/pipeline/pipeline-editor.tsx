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
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useId, useMemo, useRef, useState } from "react";
import { BlackboxNode } from "./blackbox-node";
import { type DragState, PipelineContext } from "./pipeline-context";
import { type BlackboxNodeData, canFillSlot } from "./types";

// Define nodeTypes outside component to avoid React Flow warning
const nodeTypes = {
  blackbox: BlackboxNode,
};

/**
 * Calculate the distance from a point to the nearest edge of a rect.
 * Returns 0 if point is inside the rect, positive distance if outside.
 */
const distanceFromRect = (x: number, y: number, rect: DOMRect): number => {
  const dx = Math.max(rect.left - x, 0, x - rect.right);
  const dy = Math.max(rect.top - y, 0, y - rect.bottom);
  return Math.sqrt(dx * dx + dy * dy);
};

type SlotCheckParams = {
  key: string;
  slotRect: DOMRect;
  mouse: { x: number; y: number };
  isCompatible: boolean;
  currentCapture: string | null;
  /** Distance in pixels cursor must travel from slot edge to release */
  releaseDistance: number;
};

type SlotCheckResult = {
  overlapping: boolean;
  capture: string | null;
};

/** Check a single slot's overlap and capture state during drag */
function checkSlotOverlap(params: SlotCheckParams): SlotCheckResult {
  const {
    key,
    slotRect,
    mouse,
    isCompatible,
    currentCapture,
    releaseDistance,
  } = params;

  const cursorInSlot =
    mouse.x >= slotRect.left &&
    mouse.x <= slotRect.right &&
    mouse.y >= slotRect.top &&
    mouse.y <= slotRect.bottom;

  // Cursor in slot: overlapping, and capture if compatible and not already captured
  if (cursorInSlot) {
    const capture = isCompatible && !currentCapture ? key : currentCapture;
    return { overlapping: true, capture };
  }

  // Cursor left but this slot captured us: check if cursor is far enough away
  if (currentCapture === key) {
    const distance = distanceFromRect(mouse.x, mouse.y, slotRect);
    const shouldRelease = distance >= releaseDistance;
    return {
      overlapping: !shouldRelease,
      capture: shouldRelease ? null : currentCapture,
    };
  }

  return { overlapping: false, capture: currentCapture };
}

type PipelineEditorProps = {
  initialNodes?: Node<BlackboxNodeData>[];
  initialEdges?: Edge[];
  /** Snap grid size in pixels. Default: [8, 8] */
  snapGrid?: [number, number];
  /**
   * Distance in pixels cursor must travel from slot edge to release.
   * Default: 20
   */
  magneticReleaseDistance?: number;
  /** Default zoom level. Default: 1 */
  defaultZoom?: number;
};

export function PipelineEditor({
  initialNodes = [],
  initialEdges = [],
  snapGrid = [8, 8],
  magneticReleaseDistance = 20,
  defaultZoom = 1,
}: PipelineEditorProps) {
  const flowId = useId();
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
        capturedBySlot: null,
      });
    },
    [nodes]
  );

  // Update overlap state during drag using actual slot DOM positions
  // Implements "magnetic" capture: cursor must enter slot to capture,
  // but cursor must move releaseDistance pixels away to release
  const onNodeDrag: OnNodeDrag<Node<BlackboxNodeData>> = useCallback(
    (event, draggedNode) => {
      const mouse = { x: event.clientX, y: event.clientY };

      setDragState((prev) => {
        if (!prev) {
          return prev;
        }

        const overlappingSlotKeys = new Set<string>();
        let capturedBySlot = prev.capturedBySlot;

        for (const [key, element] of slotRefsMap.current) {
          if (key.startsWith(`${draggedNode.id}:`)) {
            continue;
          }

          const isCompatible = prev.compatibleSlots.some(
            (cs) => `${cs.parentNodeId}:${cs.slot.id}` === key
          );

          const result = checkSlotOverlap({
            key,
            slotRect: element.getBoundingClientRect(),
            mouse,
            isCompatible,
            currentCapture: capturedBySlot,
            releaseDistance: magneticReleaseDistance,
          });

          if (result.overlapping) {
            overlappingSlotKeys.add(key);
          }
          capturedBySlot = result.capture;
        }

        return { ...prev, overlappingSlotKeys, capturedBySlot };
      });
    },
    [magneticReleaseDistance]
  );

  // Check if a dragged node overlaps with a slot and can fill it
  // Uses capturedBySlot for magnetic drop behavior
  const onNodeDragStop: OnNodeDrag<Node<BlackboxNodeData>> = useCallback(
    (_event, draggedNode) => {
      // Check if we have a captured slot from the magnetic effect
      const captured = dragState?.capturedBySlot;

      if (captured) {
        const [parentNodeId, slotId] = captured.split(":");
        const parentNode = nodes.find((n) => n.id === parentNodeId);
        const slot = parentNode?.data.slots?.find((s) => s.id === slotId);

        // Verify the slot is still valid and fillable
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

      // No captured slot, just clear the drag state
      setDragState(null);
    },
    [nodes, handleSlotFill, dragState?.capturedBySlot]
  );

  return (
    <PipelineContext.Provider value={contextValue}>
      <ReactFlowProvider>
        <div className="h-full w-full">
          <ReactFlow
            edges={edges}
            fitView
            fitViewOptions={{ maxZoom: defaultZoom }}
            id={flowId}
            isValidConnection={isValidConnection}
            nodes={visibleNodes}
            nodeTypes={nodeTypes}
            onConnect={onConnect}
            onEdgesChange={onEdgesChange}
            onNodeDrag={onNodeDrag}
            onNodeDragStart={onNodeDragStart}
            onNodeDragStop={onNodeDragStop}
            onNodesChange={onNodesChange}
            snapGrid={snapGrid}
            snapToGrid
          >
            <Background gap={16} size={1} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </PipelineContext.Provider>
  );
}
