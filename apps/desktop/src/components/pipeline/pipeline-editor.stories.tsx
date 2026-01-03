import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Edge, Node } from "@xyflow/react";
import { PipelineEditor } from "./pipeline-editor";
import type { BlackboxNodeData } from "./types";

const meta: Meta<typeof PipelineEditor> = {
  title: "Pipeline/Editor",
  component: PipelineEditor,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (StoryComponent) => (
      <div style={{ width: "100vw", height: "100vh" }}>
        <StoryComponent />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

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

// ============================================================================
// Node Slots - Composition Examples
// ============================================================================

// A Map node with an empty slot - waiting for a transformer function
const mapWithEmptySlot: Node<BlackboxNodeData>[] = [
  {
    id: "data-source",
    type: "blackbox",
    position: { x: 50, y: 150 },
    data: {
      label: "Data Source",
      inputs: [],
      outputs: [
        { id: "items", label: "items", type: "array", itemType: "object" },
      ],
    },
  },
  {
    id: "map-node",
    type: "blackbox",
    position: { x: 300, y: 100 },
    data: {
      label: "Map",
      inputs: [
        { id: "items", label: "items", type: "array", itemType: "object" },
      ],
      outputs: [
        { id: "result", label: "result", type: "array", itemType: "object" },
      ],
      slots: [
        {
          id: "transformer",
          label: "transform each",
          accepts: {
            inputs: [{ id: "item", label: "item", type: "object" }],
            outputs: [{ id: "result", label: "result", type: "object" }],
          },
        },
      ],
    },
  },
  {
    id: "output",
    type: "blackbox",
    position: { x: 600, y: 150 },
    data: {
      label: "Output",
      inputs: [{ id: "data", label: "data", type: "any" }],
      outputs: [],
    },
  },
];

export const NodeWithEmptySlot: Story = {
  args: {
    initialNodes: mapWithEmptySlot,
    initialEdges: [
      {
        id: "e1",
        source: "data-source",
        sourceHandle: "items",
        target: "map-node",
        targetHandle: "items",
      },
      {
        id: "e2",
        source: "map-node",
        sourceHandle: "result",
        target: "output",
        targetHandle: "data",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "A Map node with an empty slot. The dashed box shows where a transformer node can be placed. It accepts (object) → (object).",
      },
    },
  },
};

// A Map node with a filled slot
const mapWithFilledSlot: Node<BlackboxNodeData>[] = [
  {
    id: "data-source",
    type: "blackbox",
    position: { x: 50, y: 150 },
    data: {
      label: "Users API",
      inputs: [],
      outputs: [
        { id: "users", label: "users", type: "array", itemType: "object" },
      ],
    },
  },
  {
    id: "extract-name",
    type: "blackbox",
    position: { x: 0, y: 0 }, // Position doesn't matter - it's slotted
    data: {
      label: "Extract Name",
      inputs: [{ id: "user", label: "user", type: "object" }],
      outputs: [{ id: "name", label: "name", type: "string" }],
    },
  },
  {
    id: "map-node",
    type: "blackbox",
    position: { x: 300, y: 100 },
    data: {
      label: "Map",
      inputs: [
        { id: "items", label: "items", type: "array", itemType: "object" },
      ],
      outputs: [
        { id: "result", label: "names", type: "array", itemType: "string" },
      ],
      slots: [
        {
          id: "transformer",
          label: "transform each",
          accepts: {
            inputs: [{ id: "item", label: "item", type: "object" }],
            outputs: [{ id: "result", label: "result", type: "string" }],
          },
          filledBy: "extract-name",
        },
      ],
    },
  },
  {
    id: "output",
    type: "blackbox",
    position: { x: 600, y: 150 },
    data: {
      label: "Name List",
      inputs: [{ id: "names", label: "names", type: "array" }],
      outputs: [],
    },
  },
];

export const NodeWithFilledSlot: Story = {
  args: {
    initialNodes: mapWithFilledSlot,
    initialEdges: [
      {
        id: "e1",
        source: "data-source",
        sourceHandle: "users",
        target: "map-node",
        targetHandle: "items",
      },
      {
        id: "e2",
        source: "map-node",
        sourceHandle: "result",
        target: "output",
        targetHandle: "names",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "A Map node with a filled slot. The 'Extract Name' node is composed inside the Map, transforming each user object into a name string.",
      },
    },
  },
};

// Complex nested composition
const nestedComposition: Node<BlackboxNodeData>[] = [
  {
    id: "api",
    type: "blackbox",
    position: { x: 50, y: 175 },
    data: {
      label: "Fetch Orders",
      inputs: [],
      outputs: [
        { id: "orders", label: "orders", type: "array", itemType: "object" },
      ],
    },
  },
  // The inner-most transform
  {
    id: "calc-total",
    type: "blackbox",
    position: { x: 0, y: 0 },
    data: {
      label: "Calculate Total",
      inputs: [{ id: "item", label: "item", type: "object" }],
      outputs: [{ id: "total", label: "total", type: "number" }],
    },
  },
  // A Map node that uses calc-total
  {
    id: "inner-map",
    type: "blackbox",
    position: { x: 0, y: 0 },
    data: {
      label: "Sum Items",
      inputs: [{ id: "order", label: "order", type: "object" }],
      outputs: [{ id: "total", label: "total", type: "number" }],
      slots: [
        {
          id: "item-calc",
          label: "for each item",
          accepts: {
            inputs: [{ id: "item", label: "item", type: "object" }],
            outputs: [{ id: "val", label: "val", type: "number" }],
          },
          filledBy: "calc-total",
        },
      ],
    },
  },
  // Outer ForEach that uses inner-map
  {
    id: "outer-foreach",
    type: "blackbox",
    position: { x: 300, y: 100 },
    data: {
      label: "ForEach Order",
      inputs: [
        { id: "orders", label: "orders", type: "array", itemType: "object" },
      ],
      outputs: [
        { id: "totals", label: "totals", type: "array", itemType: "number" },
      ],
      slots: [
        {
          id: "process-order",
          label: "process each",
          accepts: {
            inputs: [{ id: "order", label: "order", type: "object" }],
            outputs: [{ id: "result", label: "result", type: "number" }],
          },
          filledBy: "inner-map",
        },
      ],
    },
  },
  {
    id: "sum-all",
    type: "blackbox",
    position: { x: 600, y: 175 },
    data: {
      label: "Sum All",
      inputs: [{ id: "numbers", label: "numbers", type: "array" }],
      outputs: [{ id: "total", label: "total", type: "number" }],
    },
  },
];

export const NestedComposition: Story = {
  args: {
    initialNodes: nestedComposition,
    initialEdges: [
      {
        id: "e1",
        source: "api",
        sourceHandle: "orders",
        target: "outer-foreach",
        targetHandle: "orders",
      },
      {
        id: "e2",
        source: "outer-foreach",
        sourceHandle: "totals",
        target: "sum-all",
        targetHandle: "numbers",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Nested composition: ForEach Order contains Sum Items, which contains Calculate Total. This shows how nodes can be composed recursively.",
      },
    },
  },
};

// Filter with predicate slot
const filterWithSlot: Node<BlackboxNodeData>[] = [
  {
    id: "numbers",
    type: "blackbox",
    position: { x: 50, y: 150 },
    data: {
      label: "Numbers",
      inputs: [],
      outputs: [
        { id: "nums", label: "nums", type: "array", itemType: "number" },
      ],
    },
  },
  {
    id: "is-even",
    type: "blackbox",
    position: { x: 0, y: 0 },
    data: {
      label: "Is Even?",
      inputs: [{ id: "n", label: "n", type: "number" }],
      outputs: [{ id: "result", label: "result", type: "boolean" }],
    },
  },
  {
    id: "filter-node",
    type: "blackbox",
    position: { x: 300, y: 100 },
    data: {
      label: "Filter",
      inputs: [
        { id: "items", label: "items", type: "array", itemType: "number" },
      ],
      outputs: [
        {
          id: "filtered",
          label: "filtered",
          type: "array",
          itemType: "number",
        },
      ],
      slots: [
        {
          id: "predicate",
          label: "keep if",
          accepts: {
            inputs: [{ id: "item", label: "item", type: "number" }],
            outputs: [{ id: "keep", label: "keep", type: "boolean" }],
          },
          filledBy: "is-even",
        },
      ],
    },
  },
  {
    id: "output",
    type: "blackbox",
    position: { x: 600, y: 150 },
    data: {
      label: "Even Numbers",
      inputs: [{ id: "nums", label: "nums", type: "array" }],
      outputs: [],
    },
  },
];

export const FilterWithPredicate: Story = {
  args: {
    initialNodes: filterWithSlot,
    initialEdges: [
      {
        id: "e1",
        source: "numbers",
        sourceHandle: "nums",
        target: "filter-node",
        targetHandle: "items",
      },
      {
        id: "e2",
        source: "filter-node",
        sourceHandle: "filtered",
        target: "output",
        targetHandle: "nums",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "A Filter node with a predicate slot. The 'Is Even?' node returns a boolean, determining which items to keep.",
      },
    },
  },
};

// ============================================================================
// Interactive Drag-and-Drop Demo
// ============================================================================

const dragDropNodes: Node<BlackboxNodeData>[] = [
  // A Map node with an empty slot
  {
    id: "map-node",
    type: "blackbox",
    position: { x: 300, y: 100 },
    data: {
      label: "Map",
      inputs: [
        { id: "items", label: "items", type: "array", itemType: "string" },
      ],
      outputs: [
        { id: "result", label: "result", type: "array", itemType: "string" },
      ],
      slots: [
        {
          id: "transformer",
          label: "transform each",
          accepts: {
            inputs: [{ id: "item", label: "item", type: "string" }],
            outputs: [{ id: "result", label: "result", type: "string" }],
          },
          // Empty - no filledBy
        },
      ],
    },
  },
  // Compatible node - can be dragged into the slot
  {
    id: "uppercase",
    type: "blackbox",
    position: { x: 50, y: 50 },
    data: {
      label: "Uppercase",
      inputs: [{ id: "str", label: "str", type: "string" }],
      outputs: [{ id: "result", label: "result", type: "string" }],
    },
  },
  // Compatible node - can also be dragged into the slot
  {
    id: "trim",
    type: "blackbox",
    position: { x: 50, y: 150 },
    data: {
      label: "Trim",
      inputs: [{ id: "str", label: "str", type: "string" }],
      outputs: [{ id: "result", label: "result", type: "string" }],
    },
  },
  // Incompatible node - number->number won't fit string->string slot
  {
    id: "double",
    type: "blackbox",
    position: { x: 50, y: 250 },
    data: {
      label: "Double",
      inputs: [{ id: "n", label: "n", type: "number" }],
      outputs: [{ id: "result", label: "result", type: "number" }],
    },
  },
];

export const DragAndDropDemo: Story = {
  args: {
    initialNodes: dragDropNodes,
    initialEdges: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Interactive demo!** Drag 'Uppercase' or 'Trim' into the Map's slot. 'Double' won't work (wrong types). Double-click a filled slot to remove it.",
      },
    },
  },
};

// ============================================================================
// Reduce/Fold - Accumulator Pattern
// ============================================================================

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
  // The reducer function node
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

// ============================================================================
// Pipeline Chain - Sequential Slots
// ============================================================================

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
  // Validation step node
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
  // Transform step node
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
  // Output step node
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
  // The Pipeline node with 3 sequential slots
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

// ============================================================================
// Conditional Branch - If/Else with Predicate
// ============================================================================

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
  // Predicate node
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
  // Then branch node
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
  // Else branch node
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
  // The Conditional node with predicate and two branch slots
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
