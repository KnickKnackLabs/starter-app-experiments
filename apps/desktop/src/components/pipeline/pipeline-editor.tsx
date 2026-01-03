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
  type OnNodesChange,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo, useState } from "react";
import { BlackboxNode } from "./blackbox-node";
import type { BlackboxNodeData } from "./types";

interface PipelineEditorProps {
  initialNodes?: Node<BlackboxNodeData>[];
  initialEdges?: Edge[];
}

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

  // Create nodeTypes with getNodeData injected
  // We need to create a wrapper component that passes getNodeData
  const nodeTypes = useMemo(
    () => ({
      blackbox: (props: Parameters<typeof BlackboxNode>[0]) => (
        <BlackboxNode {...props} getNodeData={getNodeData} />
      ),
    }),
    [getNodeData]
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

      if (!(sourceNode && targetNode)) return false;

      const sourcePort = sourceNode.data.outputs.find(
        (o) => o.id === connection.sourceHandle
      );
      const targetPort = targetNode.data.inputs.find(
        (i) => i.id === connection.targetHandle
      );

      if (!(sourcePort && targetPort)) return false;

      // Allow connection if types match, or either is "any"
      return (
        sourcePort.type === targetPort.type ||
        sourcePort.type === "any" ||
        targetPort.type === "any"
      );
    },
    [nodes]
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        edges={edges}
        fitView
        isValidConnection={isValidConnection}
        nodes={visibleNodes}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        snapGrid={[16, 16]}
        snapToGrid
      >
        <Background gap={16} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
