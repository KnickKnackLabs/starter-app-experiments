import type { StoryObj } from "@storybook/react-vite";
import type { Node } from "@xyflow/react";
import type { BlackboxNodeData, PortShape } from "../types";
import { type PipelineStoryArgs, pipelineStoryMeta } from "./story-utils";

const meta = {
  ...pipelineStoryMeta,
  title: "Pipeline/PortDesign",
};

export default meta;
type Story = StoryObj<PipelineStoryArgs>;

// Helper to create a node with a specific port shape
type ShapeNodeParams = {
  id: string;
  label: string;
  shape: PortShape;
  x: number;
  y: number;
};

const createShapeNode = ({
  id,
  label,
  shape,
  x,
  y,
}: ShapeNodeParams): Node<BlackboxNodeData> => ({
  id,
  type: "blackbox",
  position: { x, y },
  data: {
    label,
    portShape: shape,
    inputs: [
      { id: "str", label: "text", type: "string" },
      { id: "num", label: "count", type: "number" },
    ],
    outputs: [
      { id: "result", label: "result", type: "object" },
      { id: "valid", label: "valid", type: "boolean" },
    ],
  },
});

// Shape comparison nodes
const shapeComparisonNodes: Node<BlackboxNodeData>[] = [
  createShapeNode({
    id: "circle",
    label: "Circle (default)",
    shape: "circle",
    x: 50,
    y: 50,
  }),
  createShapeNode({
    id: "diamond",
    label: "Diamond",
    shape: "diamond",
    x: 250,
    y: 50,
  }),
  createShapeNode({
    id: "square",
    label: "Square",
    shape: "square",
    x: 450,
    y: 50,
  }),
  createShapeNode({
    id: "triangle",
    label: "Triangle",
    shape: "triangle",
    x: 650,
    y: 50,
  }),
];

export const ShapeComparison: Story = {
  args: {
    initialNodes: shapeComparisonNodes,
    initialEdges: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Compare different port shapes: circle, diamond, square, and triangle. Triangle ports point inward for inputs and outward for outputs.",
      },
    },
  },
};

// Various node configurations to test port designs
const portDesignNodes: Node<BlackboxNodeData>[] = [
  {
    id: "simple",
    type: "blackbox",
    position: { x: 50, y: 50 },
    data: {
      label: "Simple",
      inputs: [{ id: "in", label: "input", type: "string" }],
      outputs: [{ id: "out", label: "output", type: "string" }],
    },
  },
  {
    id: "multi-same",
    type: "blackbox",
    position: { x: 50, y: 150 },
    data: {
      label: "Multi Same Type",
      inputs: [
        { id: "a", label: "a", type: "number" },
        { id: "b", label: "b", type: "number" },
        { id: "c", label: "c", type: "number" },
      ],
      outputs: [{ id: "sum", label: "sum", type: "number" }],
    },
  },
  {
    id: "multi-diff",
    type: "blackbox",
    position: { x: 250, y: 50 },
    data: {
      label: "Multi Types",
      inputs: [
        { id: "str", label: "text", type: "string" },
        { id: "num", label: "count", type: "number" },
        { id: "flag", label: "enabled", type: "boolean" },
      ],
      outputs: [
        { id: "result", label: "result", type: "object" },
        { id: "valid", label: "valid", type: "boolean" },
      ],
    },
  },
  {
    id: "all-types",
    type: "blackbox",
    position: { x: 250, y: 200 },
    data: {
      label: "All Types",
      inputs: [
        { id: "str", label: "string", type: "string" },
        { id: "num", label: "number", type: "number" },
        { id: "bool", label: "boolean", type: "boolean" },
        { id: "obj", label: "object", type: "object" },
        { id: "arr", label: "array", type: "array" },
        { id: "any", label: "any", type: "any" },
      ],
      outputs: [{ id: "out", label: "out", type: "any" }],
    },
  },
  {
    id: "source",
    type: "blackbox",
    position: { x: 450, y: 50 },
    data: {
      label: "Data Source",
      inputs: [],
      outputs: [
        { id: "data", label: "data", type: "array" },
        { id: "count", label: "count", type: "number" },
      ],
    },
  },
  {
    id: "sink",
    type: "blackbox",
    position: { x: 450, y: 150 },
    data: {
      label: "Output",
      inputs: [{ id: "value", label: "value", type: "any" }],
      outputs: [],
    },
  },
];

export const PortDesignTest: Story = {
  args: {
    initialNodes: portDesignNodes,
    initialEdges: [],
    portOffsetPreset: "Outside (-4px)",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Various node configurations for testing port designs. Hover over ports to see tooltips.",
      },
    },
  },
};

// Port offset comparison nodes (0 = port center on node edge)
// All nodes have matching string input/output so edges can connect them
const portOffsetNodes: Node<BlackboxNodeData>[] = [
  {
    id: "outside",
    type: "blackbox",
    position: { x: 50, y: 50 },
    data: {
      label: "Outside (-4px)",
      portOffset: -4,
      inputs: [{ id: "in", label: "input", type: "string" }],
      outputs: [{ id: "out", label: "output", type: "string" }],
    },
  },
  {
    id: "edge",
    type: "blackbox",
    position: { x: 250, y: 50 },
    data: {
      label: "On Edge (0px)",
      portOffset: 0,
      inputs: [{ id: "in", label: "input", type: "string" }],
      outputs: [{ id: "out", label: "output", type: "string" }],
    },
  },
  {
    id: "inside",
    type: "blackbox",
    position: { x: 450, y: 50 },
    data: {
      label: "Inside (4px)",
      portOffset: 4,
      inputs: [{ id: "in", label: "input", type: "string" }],
      outputs: [{ id: "out", label: "output", type: "string" }],
    },
  },
  {
    id: "deep-inside",
    type: "blackbox",
    position: { x: 650, y: 50 },
    data: {
      label: "Deep Inside (8px)",
      portOffset: 8,
      inputs: [{ id: "in", label: "input", type: "string" }],
      outputs: [{ id: "out", label: "output", type: "string" }],
    },
  },
];

export const PortOffsetComparison: Story = {
  args: {
    initialNodes: portOffsetNodes,

    initialEdges: [
      {
        id: "e1",
        source: "outside",
        sourceHandle: "out",
        target: "edge",
        targetHandle: "in",
      },
      {
        id: "e2",
        source: "edge",
        sourceHandle: "out",
        target: "inside",
        targetHandle: "in",
      },
      {
        id: "e3",
        source: "inside",
        sourceHandle: "out",
        target: "deep-inside",
        targetHandle: "in",
      },
    ],

    portShape: "triangle",
    portOffsetPreset: "Outside (-4px)",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Compare different port offset values. Negative = outside node, 0 = on edge, positive = inside node.",
      },
    },
  },
};
