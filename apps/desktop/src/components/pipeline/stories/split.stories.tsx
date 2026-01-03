import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Node } from "@xyflow/react";
import { SplitPipelineEditor } from "../split-pipeline-editor";
import type { BlackboxNodeData } from "../types";

const meta: Meta<typeof SplitPipelineEditor> = {
  title: "Pipeline/Split View",
  component: SplitPipelineEditor,
  parameters: { layout: "fullscreen" },
  decorators: [
    (StoryComponent) => (
      <div style={{ width: "100vw", height: "100vh" }}>
        <StoryComponent />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SplitPipelineEditor>;

// Sample nodes for left side - data source
const leftNodes: Node<BlackboxNodeData>[] = [
  {
    id: "fetch",
    type: "blackbox",
    position: { x: 50, y: 100 },
    data: {
      label: "Fetch Users",
      inputs: [],
      outputs: [{ id: "users", label: "users", type: "array" }],
      portOffset: 8,
    },
  },
  {
    id: "filter",
    type: "blackbox",
    position: { x: 250, y: 100 },
    data: {
      label: "Filter Active",
      inputs: [{ id: "in", label: "in", type: "array" }],
      outputs: [{ id: "out", label: "out", type: "array" }],
      portOffset: 8,
    },
  },
];

// Sample nodes for right side - data processing
const rightNodes: Node<BlackboxNodeData>[] = [
  {
    id: "input",
    type: "blackbox",
    position: { x: 50, y: 100 },
    data: {
      label: "User List",
      inputs: [{ id: "users", label: "users", type: "array" }],
      outputs: [{ id: "users", label: "users", type: "array" }],
      portOffset: 8,
    },
  },
  {
    id: "map",
    type: "blackbox",
    position: { x: 250, y: 50 },
    data: {
      label: "Extract Names",
      inputs: [{ id: "in", label: "in", type: "array" }],
      outputs: [{ id: "names", label: "names", type: "array" }],
      portOffset: 8,
    },
  },
  {
    id: "count",
    type: "blackbox",
    position: { x: 250, y: 150 },
    data: {
      label: "Count",
      inputs: [{ id: "in", label: "in", type: "array" }],
      outputs: [{ id: "count", label: "count", type: "number" }],
      portOffset: 8,
    },
  },
];

export const Default: Story = {
  args: {
    leftNodes,
    leftEdges: [
      {
        id: "e1",
        source: "fetch",
        sourceHandle: "users",
        target: "filter",
        targetHandle: "in",
      },
    ],
    leftLabel: "Data Source",
    rightNodes,
    rightEdges: [
      {
        id: "e1",
        source: "input",
        sourceHandle: "users",
        target: "map",
        targetHandle: "in",
      },
      {
        id: "e2",
        source: "input",
        sourceHandle: "users",
        target: "count",
        targetHandle: "in",
      },
    ],
    rightLabel: "Processing",
  },
};

export const Empty: Story = {
  args: {
    leftLabel: "Source",
    rightLabel: "Target",
  },
};

// Before/After comparison
const beforeNodes: Node<BlackboxNodeData>[] = [
  {
    id: "a",
    type: "blackbox",
    position: { x: 50, y: 50 },
    data: {
      label: "Get Data",
      inputs: [],
      outputs: [{ id: "out", label: "data", type: "object" }],
      portOffset: 8,
    },
  },
  {
    id: "b",
    type: "blackbox",
    position: { x: 50, y: 150 },
    data: {
      label: "Get Config",
      inputs: [],
      outputs: [{ id: "out", label: "config", type: "object" }],
      portOffset: 8,
    },
  },
  {
    id: "c",
    type: "blackbox",
    position: { x: 250, y: 100 },
    data: {
      label: "Process",
      inputs: [
        { id: "data", label: "data", type: "object" },
        { id: "config", label: "config", type: "object" },
      ],
      outputs: [{ id: "result", label: "result", type: "object" }],
      portOffset: 8,
    },
  },
];

const afterNodes: Node<BlackboxNodeData>[] = [
  {
    id: "a",
    type: "blackbox",
    position: { x: 50, y: 100 },
    data: {
      label: "Get Data",
      inputs: [],
      outputs: [{ id: "out", label: "data", type: "object" }],
      portOffset: 8,
    },
  },
  {
    id: "b",
    type: "blackbox",
    position: { x: 250, y: 50 },
    data: {
      label: "Validate",
      inputs: [{ id: "in", label: "data", type: "object" }],
      outputs: [{ id: "out", label: "valid", type: "object" }],
      portOffset: 8,
    },
  },
  {
    id: "c",
    type: "blackbox",
    position: { x: 250, y: 150 },
    data: {
      label: "Transform",
      inputs: [{ id: "in", label: "data", type: "object" }],
      outputs: [{ id: "out", label: "transformed", type: "object" }],
      portOffset: 8,
    },
  },
  {
    id: "d",
    type: "blackbox",
    position: { x: 450, y: 100 },
    data: {
      label: "Merge",
      inputs: [
        { id: "a", label: "a", type: "object" },
        { id: "b", label: "b", type: "object" },
      ],
      outputs: [{ id: "result", label: "result", type: "object" }],
      portOffset: 8,
    },
  },
];

export const BeforeAfter: Story = {
  args: {
    leftNodes: beforeNodes,
    leftEdges: [
      {
        id: "e1",
        source: "a",
        sourceHandle: "out",
        target: "c",
        targetHandle: "data",
      },
      {
        id: "e2",
        source: "b",
        sourceHandle: "out",
        target: "c",
        targetHandle: "config",
      },
    ],
    leftLabel: "Before",
    rightNodes: afterNodes,
    rightEdges: [
      {
        id: "e1",
        source: "a",
        sourceHandle: "out",
        target: "b",
        targetHandle: "in",
      },
      {
        id: "e2",
        source: "a",
        sourceHandle: "out",
        target: "c",
        targetHandle: "in",
      },
      {
        id: "e3",
        source: "b",
        sourceHandle: "out",
        target: "d",
        targetHandle: "a",
      },
      {
        id: "e4",
        source: "c",
        sourceHandle: "out",
        target: "d",
        targetHandle: "b",
      },
    ],
    rightLabel: "After",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Compare two pipeline versions side by side - useful for refactoring visualization.",
      },
    },
  },
};
