import type { StoryObj } from "@storybook/react-vite";
import type { Node } from "@xyflow/react";
import type { BlackboxNodeData, NodeAppearance } from "../types";
import { type PipelineStoryArgs, pipelineStoryMeta } from "./story-utils";

const meta = {
  ...pipelineStoryMeta,
  title: "Pipeline/NodeAppearance",
};

export default meta;
type Story = StoryObj<PipelineStoryArgs>;

// Helper to create a node with specific appearance
type AppearanceNodeOptions = {
  id: string;
  label: string;
  appearance: NodeAppearance;
  position: { x: number; y: number };
};

const createAppearanceNode = ({
  id,
  label,
  appearance,
  position,
}: AppearanceNodeOptions): Node<BlackboxNodeData> => ({
  id,
  type: "blackbox",
  position,
  data: {
    label,
    appearance,
    inputs: [
      { id: "in1", label: "data", type: "object" },
      { id: "in2", label: "config", type: "string" },
    ],
    outputs: [
      { id: "out1", label: "result", type: "object" },
      { id: "out2", label: "status", type: "boolean" },
    ],
  },
});

// All four variants side by side
const comparisonNodes: Node<BlackboxNodeData>[] = [
  createAppearanceNode({
    id: "default",
    label: "Default",
    appearance: "default",
    position: { x: 50, y: 100 },
  }),
  createAppearanceNode({
    id: "sharp",
    label: "Sharp",
    appearance: "sharp",
    position: { x: 250, y: 100 },
  }),
  createAppearanceNode({
    id: "minimal",
    label: "Minimal",
    appearance: "minimal",
    position: { x: 450, y: 100 },
  }),
  createAppearanceNode({
    id: "borderless",
    label: "Borderless",
    appearance: "borderless",
    position: { x: 650, y: 100 },
  }),
];

export const Comparison: Story = {
  args: {
    initialNodes: comparisonNodes,
    initialEdges: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Compare all four node appearance variants side by side. Click to select and see selection states.",
      },
    },
  },
};

// Default variant showcase
const defaultNodes: Node<BlackboxNodeData>[] = [
  {
    id: "source",
    type: "blackbox",
    position: { x: 50, y: 100 },
    data: {
      label: "Data Source",
      appearance: "default",
      inputs: [],
      outputs: [{ id: "data", label: "data", type: "array" }],
    },
  },
  {
    id: "transform",
    type: "blackbox",
    position: { x: 250, y: 100 },
    data: {
      label: "Transform",
      appearance: "default",
      inputs: [{ id: "in", label: "input", type: "array" }],
      outputs: [{ id: "out", label: "output", type: "array" }],
    },
  },
  {
    id: "sink",
    type: "blackbox",
    position: { x: 450, y: 100 },
    data: {
      label: "Output",
      appearance: "default",
      inputs: [{ id: "data", label: "data", type: "array" }],
      outputs: [],
    },
  },
];

export const Default: Story = {
  args: {
    initialNodes: defaultNodes,
    initialEdges: [
      {
        id: "e1",
        source: "source",
        sourceHandle: "data",
        target: "transform",
        targetHandle: "in",
      },
      {
        id: "e2",
        source: "transform",
        sourceHandle: "out",
        target: "sink",
        targetHandle: "data",
      },
    ],
    nodeAppearance: "default",
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Default**: Rounded corners (`rounded-lg`), thick 2px border, medium shadow. The original look.",
      },
    },
  },
};

export const Sharp: Story = {
  args: {
    initialNodes: defaultNodes.map((n) => ({
      ...n,
      data: { ...n.data, appearance: "sharp" as const },
    })),
    initialEdges: Default.args?.initialEdges ?? [],
    nodeAppearance: "sharp",
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Sharp**: Minimal rounded corners (`rounded-sm`), thin 1px border, subtle shadow. Selection adds a ring effect.",
      },
    },
  },
};

export const Minimal: Story = {
  args: {
    initialNodes: defaultNodes.map((n) => ({
      ...n,
      data: { ...n.data, appearance: "minimal" as const },
    })),
    initialEdges: Default.args?.initialEdges ?? [],
    nodeAppearance: "minimal",
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Minimal**: No rounded corners, left accent line, ultra-thin borders. Selection highlights the left accent.",
      },
    },
  },
};

export const Borderless: Story = {
  args: {
    initialNodes: defaultNodes.map((n) => ({
      ...n,
      data: { ...n.data, appearance: "borderless" as const },
    })),
    initialEdges: Default.args?.initialEdges ?? [],
    nodeAppearance: "borderless",
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Borderless**: No border, uses shadow for depth. Selection adds a glowing ring effect.",
      },
    },
  },
};

// Source/Sink only nodes (no inputs or outputs)
const sourceOnlyNodes: Node<BlackboxNodeData>[] = [
  {
    id: "source1",
    type: "blackbox",
    position: { x: 50, y: 50 },
    data: {
      label: "Source Only",
      inputs: [],
      outputs: [
        { id: "a", label: "a", type: "string" },
        { id: "b", label: "b", type: "number" },
      ],
    },
  },
  {
    id: "sink1",
    type: "blackbox",
    position: { x: 250, y: 50 },
    data: {
      label: "Sink Only",
      inputs: [
        { id: "x", label: "x", type: "string" },
        { id: "y", label: "y", type: "number" },
      ],
      outputs: [],
    },
  },
  {
    id: "many-ports",
    type: "blackbox",
    position: { x: 50, y: 180 },
    data: {
      label: "Many Ports",
      inputs: [
        { id: "a", label: "a", type: "string" },
        { id: "b", label: "b", type: "number" },
        { id: "c", label: "c", type: "boolean" },
      ],
      outputs: [
        { id: "x", label: "x", type: "object" },
        { id: "y", label: "y", type: "array" },
        { id: "z", label: "z", type: "any" },
      ],
    },
  },
  {
    id: "single-port",
    type: "blackbox",
    position: { x: 300, y: 180 },
    data: {
      label: "Single Port",
      inputs: [{ id: "in", label: "in", type: "any" }],
      outputs: [{ id: "out", label: "out", type: "any" }],
    },
  },
];

export const VariousConfigurations: Story = {
  args: {
    initialNodes: sourceOnlyNodes,
    initialEdges: [
      {
        id: "e1",
        source: "source1",
        sourceHandle: "a",
        target: "sink1",
        targetHandle: "x",
      },
      {
        id: "e2",
        source: "source1",
        sourceHandle: "b",
        target: "sink1",
        targetHandle: "y",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Test appearance variants with different node configurations: source-only, sink-only, many ports, single port. Use the Node Appearance control to switch between variants.",
      },
    },
  },
};
