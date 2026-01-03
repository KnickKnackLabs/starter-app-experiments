import type { StoryObj } from "@storybook/react-vite";
import type { Node } from "@xyflow/react";
import type { BlackboxNodeData } from "../types";
import { type PipelineStoryArgs, pipelineStoryMeta } from "./story-utils";

const meta = {
  ...pipelineStoryMeta,
  title: "Pipeline/Advanced",
};

export default meta;
type Story = StoryObj<PipelineStoryArgs>;

// Reduce/Fold - Accumulator Pattern
const reduceNodes: Node<BlackboxNodeData>[] = [
  {
    id: "numbers",
    type: "blackbox",
    position: { x: 50, y: 150 },
    data: {
      label: "Numbers [1,2,3,4,5]",
      inputs: [],
      outputs: [
        { id: "nums", label: "nums", type: "array", itemType: "number" },
      ],
    },
  },
  {
    id: "initial-value",
    type: "blackbox",
    position: { x: 50, y: 300 },
    data: {
      label: "Initial: 0",
      inputs: [],
      outputs: [{ id: "val", label: "val", type: "number" }],
    },
  },
  {
    id: "add-reducer",
    type: "blackbox",
    position: { x: 0, y: 0 },
    data: {
      label: "Add",
      inputs: [
        { id: "acc", label: "acc", type: "number" },
        { id: "item", label: "item", type: "number" },
      ],
      outputs: [{ id: "result", label: "result", type: "number" }],
    },
  },
  {
    id: "reduce-node",
    type: "blackbox",
    position: { x: 300, y: 100 },
    data: {
      label: "Reduce",
      inputs: [
        { id: "items", label: "items", type: "array", itemType: "number" },
        { id: "initial", label: "initial", type: "number" },
      ],
      outputs: [{ id: "result", label: "result", type: "number" }],
      slots: [
        {
          id: "reducer",
          label: "combine (acc, item) →",
          accepts: {
            inputs: [
              { id: "acc", label: "acc", type: "number" },
              { id: "item", label: "item", type: "number" },
            ],
            outputs: [{ id: "result", label: "result", type: "number" }],
          },
          filledBy: "add-reducer",
        },
      ],
    },
  },
  {
    id: "result",
    type: "blackbox",
    position: { x: 600, y: 175 },
    data: {
      label: "Sum: 15",
      inputs: [{ id: "val", label: "val", type: "number" }],
      outputs: [],
    },
  },
];

export const ReduceFold: Story = {
  args: {
    initialNodes: reduceNodes,
    initialEdges: [
      {
        id: "e1",
        source: "numbers",
        sourceHandle: "nums",
        target: "reduce-node",
        targetHandle: "items",
      },
      {
        id: "e2",
        source: "initial-value",
        sourceHandle: "val",
        target: "reduce-node",
        targetHandle: "initial",
      },
      {
        id: "e3",
        source: "reduce-node",
        sourceHandle: "result",
        target: "result",
        targetHandle: "val",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "A Reduce/Fold node with an accumulator pattern. Takes an initial value and a reducer slot that combines (accumulator, item) → new accumulator. Shows sum of [1,2,3,4,5] = 15.",
      },
    },
  },
};

// Pipeline Chain - Sequential Slots
const pipelineChainNodes: Node<BlackboxNodeData>[] = [
  {
    id: "raw-input",
    type: "blackbox",
    position: { x: 50, y: 175 },
    data: {
      label: "User Input",
      inputs: [],
      outputs: [{ id: "data", label: "data", type: "string" }],
    },
  },
  {
    id: "email-validator",
    type: "blackbox",
    position: { x: 0, y: 0 },
    data: {
      label: "Email Validator",
      inputs: [{ id: "input", label: "input", type: "string" }],
      outputs: [{ id: "valid", label: "valid", type: "string" }],
    },
  },
  {
    id: "lowercase-transform",
    type: "blackbox",
    position: { x: 0, y: 0 },
    data: {
      label: "Lowercase",
      inputs: [{ id: "str", label: "str", type: "string" }],
      outputs: [{ id: "result", label: "result", type: "string" }],
    },
  },
  {
    id: "db-writer",
    type: "blackbox",
    position: { x: 0, y: 0 },
    data: {
      label: "Write to DB",
      inputs: [{ id: "data", label: "data", type: "string" }],
      outputs: [{ id: "id", label: "id", type: "string" }],
    },
  },
  {
    id: "pipeline",
    type: "blackbox",
    position: { x: 300, y: 50 },
    data: {
      label: "Processing Pipeline",
      inputs: [{ id: "input", label: "input", type: "string" }],
      outputs: [{ id: "output", label: "output", type: "string" }],
      slots: [
        {
          id: "validate",
          label: "1. validate",
          accepts: {
            inputs: [{ id: "in", label: "in", type: "string" }],
            outputs: [{ id: "out", label: "out", type: "string" }],
          },
          filledBy: "email-validator",
        },
        {
          id: "transform",
          label: "2. transform",
          accepts: {
            inputs: [{ id: "in", label: "in", type: "string" }],
            outputs: [{ id: "out", label: "out", type: "string" }],
          },
          filledBy: "lowercase-transform",
        },
        {
          id: "output",
          label: "3. output",
          accepts: {
            inputs: [{ id: "in", label: "in", type: "string" }],
            outputs: [{ id: "out", label: "out", type: "string" }],
          },
          filledBy: "db-writer",
        },
      ],
    },
  },
  {
    id: "result",
    type: "blackbox",
    position: { x: 600, y: 175 },
    data: {
      label: "Record ID",
      inputs: [{ id: "id", label: "id", type: "string" }],
      outputs: [],
    },
  },
];

export const PipelineChain: Story = {
  args: {
    initialNodes: pipelineChainNodes,
    initialEdges: [
      {
        id: "e1",
        source: "raw-input",
        sourceHandle: "data",
        target: "pipeline",
        targetHandle: "input",
      },
      {
        id: "e2",
        source: "pipeline",
        sourceHandle: "output",
        target: "result",
        targetHandle: "id",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "A Pipeline node with 3 sequential slots: validate → transform → output. Each step processes data in order. Double-click any slot to eject and swap in a different processor.",
      },
    },
  },
};

// Conditional Branch - If/Else with Predicate
const conditionalNodes: Node<BlackboxNodeData>[] = [
  {
    id: "user-data",
    type: "blackbox",
    position: { x: 50, y: 175 },
    data: {
      label: "User Data",
      inputs: [],
      outputs: [{ id: "user", label: "user", type: "object" }],
    },
  },
  {
    id: "is-premium",
    type: "blackbox",
    position: { x: 0, y: 0 },
    data: {
      label: "Is Premium?",
      inputs: [{ id: "user", label: "user", type: "object" }],
      outputs: [{ id: "result", label: "result", type: "boolean" }],
    },
  },
  {
    id: "premium-handler",
    type: "blackbox",
    position: { x: 0, y: 0 },
    data: {
      label: "Premium Features",
      inputs: [{ id: "user", label: "user", type: "object" }],
      outputs: [{ id: "response", label: "response", type: "object" }],
    },
  },
  {
    id: "free-handler",
    type: "blackbox",
    position: { x: 0, y: 0 },
    data: {
      label: "Free Tier",
      inputs: [{ id: "user", label: "user", type: "object" }],
      outputs: [{ id: "response", label: "response", type: "object" }],
    },
  },
  {
    id: "if-else",
    type: "blackbox",
    position: { x: 300, y: 50 },
    data: {
      label: "If / Else",
      inputs: [{ id: "data", label: "data", type: "object" }],
      outputs: [{ id: "result", label: "result", type: "object" }],
      slots: [
        {
          id: "predicate",
          label: "condition",
          accepts: {
            inputs: [{ id: "data", label: "data", type: "object" }],
            outputs: [{ id: "result", label: "result", type: "boolean" }],
          },
          filledBy: "is-premium",
        },
        {
          id: "then-branch",
          label: "then →",
          accepts: {
            inputs: [{ id: "data", label: "data", type: "object" }],
            outputs: [{ id: "result", label: "result", type: "object" }],
          },
          filledBy: "premium-handler",
        },
        {
          id: "else-branch",
          label: "else →",
          accepts: {
            inputs: [{ id: "data", label: "data", type: "object" }],
            outputs: [{ id: "result", label: "result", type: "object" }],
          },
          filledBy: "free-handler",
        },
      ],
    },
  },
  {
    id: "output",
    type: "blackbox",
    position: { x: 600, y: 175 },
    data: {
      label: "Response",
      inputs: [{ id: "response", label: "response", type: "object" }],
      outputs: [],
    },
  },
];

export const ConditionalBranch: Story = {
  args: {
    initialNodes: conditionalNodes,
    initialEdges: [
      {
        id: "e1",
        source: "user-data",
        sourceHandle: "user",
        target: "if-else",
        targetHandle: "data",
      },
      {
        id: "e2",
        source: "if-else",
        sourceHandle: "result",
        target: "output",
        targetHandle: "response",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "A Conditional (If/Else) node with three slots: a predicate that returns boolean, a 'then' branch for true, and an 'else' branch for false. Only one branch executes based on the condition.",
      },
    },
  },
};
