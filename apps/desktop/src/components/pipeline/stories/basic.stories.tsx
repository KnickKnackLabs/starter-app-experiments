import type { StoryObj } from "@storybook/react-vite";
import type { Edge, Node } from "@xyflow/react";
import type { BlackboxNodeData } from "../types";
import { type PipelineStoryArgs, pipelineStoryMeta } from "./story-utils";

const meta = {
  ...pipelineStoryMeta,
  title: "Pipeline/Editor",
};

export default meta;
type Story = StoryObj<PipelineStoryArgs>;

// Sample nodes for demos
const sampleNodes: Node<BlackboxNodeData>[] = [
  {
    id: "input-1",
    type: "blackbox",
    position: { x: 50, y: 100 },
    data: {
      label: "Text Input",
      inputs: [],
      outputs: [{ id: "text-out", label: "text", type: "string" }],
    },
  },
  {
    id: "input-2",
    type: "blackbox",
    position: { x: 50, y: 250 },
    data: {
      label: "Number Input",
      inputs: [],
      outputs: [{ id: "num-out", label: "value", type: "number" }],
    },
  },
  {
    id: "transform-1",
    type: "blackbox",
    position: { x: 300, y: 100 },
    data: {
      label: "Parse JSON",
      inputs: [{ id: "json-in", label: "json", type: "string" }],
      outputs: [{ id: "obj-out", label: "data", type: "object" }],
    },
  },
  {
    id: "transform-2",
    type: "blackbox",
    position: { x: 300, y: 250 },
    data: {
      label: "Multiply",
      inputs: [
        { id: "a", label: "a", type: "number" },
        { id: "b", label: "b", type: "number" },
      ],
      outputs: [{ id: "result", label: "result", type: "number" }],
    },
  },
  {
    id: "output-1",
    type: "blackbox",
    position: { x: 550, y: 175 },
    data: {
      label: "Console Log",
      inputs: [{ id: "any-in", label: "value", type: "any" }],
      outputs: [],
    },
  },
];

const sampleEdges: Edge[] = [
  {
    id: "e1",
    source: "input-1",
    sourceHandle: "text-out",
    target: "transform-1",
    targetHandle: "json-in",
  },
];

export const Default: Story = {
  args: {
    initialNodes: sampleNodes,
    initialEdges: sampleEdges,
  },
};

export const Empty: Story = {
  args: {
    initialNodes: [],
    initialEdges: [],
  },
};

// Data processing pipeline example
const dataProcessingNodes: Node<BlackboxNodeData>[] = [
  {
    id: "fetch",
    type: "blackbox",
    position: { x: 50, y: 150 },
    data: {
      label: "Fetch API",
      inputs: [{ id: "url", label: "url", type: "string" }],
      outputs: [{ id: "response", label: "response", type: "object" }],
    },
  },
  {
    id: "extract",
    type: "blackbox",
    position: { x: 300, y: 100 },
    data: {
      label: "Extract Items",
      inputs: [{ id: "data", label: "data", type: "object" }],
      outputs: [{ id: "items", label: "items", type: "array" }],
    },
  },
  {
    id: "filter",
    type: "blackbox",
    position: { x: 300, y: 250 },
    data: {
      label: "Filter",
      inputs: [
        { id: "arr", label: "array", type: "array" },
        { id: "pred", label: "predicate", type: "string" },
      ],
      outputs: [{ id: "filtered", label: "filtered", type: "array" }],
    },
  },
  {
    id: "map",
    type: "blackbox",
    position: { x: 550, y: 175 },
    data: {
      label: "Map",
      inputs: [
        { id: "arr", label: "array", type: "array" },
        { id: "fn", label: "mapper", type: "string" },
      ],
      outputs: [{ id: "mapped", label: "result", type: "array" }],
    },
  },
  {
    id: "output",
    type: "blackbox",
    position: { x: 800, y: 175 },
    data: {
      label: "Output",
      inputs: [{ id: "result", label: "result", type: "any" }],
      outputs: [],
    },
  },
];

const dataProcessingEdges: Edge[] = [
  {
    id: "e1",
    source: "fetch",
    sourceHandle: "response",
    target: "extract",
    targetHandle: "data",
  },
  {
    id: "e2",
    source: "extract",
    sourceHandle: "items",
    target: "filter",
    targetHandle: "arr",
  },
  {
    id: "e3",
    source: "filter",
    sourceHandle: "filtered",
    target: "map",
    targetHandle: "arr",
  },
  {
    id: "e4",
    source: "map",
    sourceHandle: "mapped",
    target: "output",
    targetHandle: "result",
  },
];

export const DataProcessingPipeline: Story = {
  args: {
    initialNodes: dataProcessingNodes,
    initialEdges: dataProcessingEdges,
  },
};

// Simple math operations
const mathNodes: Node<BlackboxNodeData>[] = [
  {
    id: "const-a",
    type: "blackbox",
    position: { x: 50, y: 50 },
    data: {
      label: "Constant: 5",
      inputs: [],
      outputs: [{ id: "val", label: "value", type: "number" }],
    },
  },
  {
    id: "const-b",
    type: "blackbox",
    position: { x: 50, y: 150 },
    data: {
      label: "Constant: 3",
      inputs: [],
      outputs: [{ id: "val", label: "value", type: "number" }],
    },
  },
  {
    id: "const-c",
    type: "blackbox",
    position: { x: 50, y: 250 },
    data: {
      label: "Constant: 2",
      inputs: [],
      outputs: [{ id: "val", label: "value", type: "number" }],
    },
  },
  {
    id: "add",
    type: "blackbox",
    position: { x: 250, y: 100 },
    data: {
      label: "Add",
      inputs: [
        { id: "a", label: "a", type: "number" },
        { id: "b", label: "b", type: "number" },
      ],
      outputs: [{ id: "sum", label: "sum", type: "number" }],
    },
  },
  {
    id: "multiply",
    type: "blackbox",
    position: { x: 450, y: 150 },
    data: {
      label: "Multiply",
      inputs: [
        { id: "a", label: "a", type: "number" },
        { id: "b", label: "b", type: "number" },
      ],
      outputs: [{ id: "product", label: "product", type: "number" }],
    },
  },
  {
    id: "result",
    type: "blackbox",
    position: { x: 650, y: 150 },
    data: {
      label: "Result",
      inputs: [{ id: "val", label: "value", type: "number" }],
      outputs: [],
    },
  },
];

const mathEdges: Edge[] = [
  {
    id: "e1",
    source: "const-a",
    sourceHandle: "val",
    target: "add",
    targetHandle: "a",
  },
  {
    id: "e2",
    source: "const-b",
    sourceHandle: "val",
    target: "add",
    targetHandle: "b",
  },
  {
    id: "e3",
    source: "add",
    sourceHandle: "sum",
    target: "multiply",
    targetHandle: "a",
  },
  {
    id: "e4",
    source: "const-c",
    sourceHandle: "val",
    target: "multiply",
    targetHandle: "b",
  },
  {
    id: "e5",
    source: "multiply",
    sourceHandle: "product",
    target: "result",
    targetHandle: "val",
  },
];

export const MathOperations: Story = {
  args: {
    initialNodes: mathNodes,
    initialEdges: mathEdges,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates (5 + 3) × 2 = 16. Try dragging nodes and creating new connections!",
      },
    },
  },
};
