# xyflow (React Flow) Reference

Quick reference for building node-based editors with React Flow.

## Installation

```bash
npm install @xyflow/react
```

```tsx
// Required CSS import
import '@xyflow/react/dist/style.css';
```

## Basic Setup

```tsx
import { useState, useCallback } from 'react';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];

const initialEdges: Edge[] = [
  { id: 'n1-n2', source: 'n1', target: 'n2' },
];

export function FlowEditor() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}
```

**Important:** Parent container must have defined width and height.

## Custom Nodes

```tsx
import { Handle, Position, type NodeProps } from '@xyflow/react';

type BlackboxNodeData = {
  label: string;
  inputs: { id: string; type: string }[];
  outputs: { id: string; type: string }[];
};

export function BlackboxNode({ data }: NodeProps<BlackboxNodeData>) {
  return (
    <div className="rounded border bg-background p-4 shadow">
      {/* Input handles (targets) */}
      {data.inputs.map((input, i) => (
        <Handle
          key={input.id}
          id={input.id}
          type="target"
          position={Position.Left}
          style={{ top: `${(i + 1) * 20}px` }}
        />
      ))}

      <div className="font-medium">{data.label}</div>

      {/* Output handles (sources) */}
      {data.outputs.map((output, i) => (
        <Handle
          key={output.id}
          id={output.id}
          type="source"
          position={Position.Right}
          style={{ top: `${(i + 1) * 20}px` }}
        />
      ))}
    </div>
  );
}

// Register custom nodes
const nodeTypes = {
  blackbox: BlackboxNode,
};

<ReactFlow nodeTypes={nodeTypes} ... />
```

## Handle Types

- `type="target"` - Input (receives connections)
- `type="source"` - Output (starts connections)
- `position` - Position enum: `Top`, `Right`, `Bottom`, `Left`
- `id` - Unique ID for multiple handles on same node

## Connection Validation

Use `isValidConnection` at the ReactFlow level (better performance than per-handle):

```tsx
import { type Connection } from '@xyflow/react';

const isValidConnection = useCallback((connection: Connection) => {
  // Get source and target node data
  const sourceNode = nodes.find((n) => n.id === connection.source);
  const targetNode = nodes.find((n) => n.id === connection.target);

  // Get handle types from node data
  const sourceHandle = sourceNode?.data.outputs.find(
    (o) => o.id === connection.sourceHandle
  );
  const targetHandle = targetNode?.data.inputs.find(
    (i) => i.id === connection.targetHandle
  );

  // Only allow matching types
  return sourceHandle?.type === targetHandle?.type;
}, [nodes]);

<ReactFlow isValidConnection={isValidConnection} ... />
```

## Useful Props

| Prop | Description |
|------|-------------|
| `fitView` | Auto-fit all nodes in view on load |
| `snapToGrid` | Enable grid snapping |
| `snapGrid={[15, 15]}` | Grid size for snapping |
| `nodesDraggable` | Enable/disable node dragging |
| `nodesConnectable` | Enable/disable creating connections |
| `elementsSelectable` | Enable/disable selection |
| `panOnDrag` | Pan canvas by dragging |
| `zoomOnScroll` | Zoom with scroll wheel |

## Built-in Components

```tsx
import {
  ReactFlow,
  Background,      // Grid/dots background
  Controls,        // Zoom controls
  MiniMap,         // Overview minimap
  Panel,           // Positioned panels
} from '@xyflow/react';

<ReactFlow ...>
  <Background variant="dots" gap={12} size={1} />
  <Controls />
  <MiniMap />
  <Panel position="top-left">Custom UI here</Panel>
</ReactFlow>
```

## Key Types

```tsx
import type {
  Node,
  Edge,
  Connection,
  NodeProps,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  IsValidConnection,
} from '@xyflow/react';
```

## Styling with Tailwind

React Flow works well with Tailwind. Style custom nodes directly:

```tsx
<div className="rounded-lg border-2 border-primary bg-card p-4 shadow-md">
  ...
</div>
```

For handles, use inline styles or CSS classes:

```css
.react-flow__handle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.react-flow__handle-left { left: -6px; }
.react-flow__handle-right { right: -6px; }
```

## Performance Tips

1. Memoize custom node components with `memo()`
2. Use `isValidConnection` at ReactFlow level, not per-handle
3. Define `nodeTypes` outside component (or memoize)
4. For large graphs, use virtualization (built-in for 1000+ nodes)
