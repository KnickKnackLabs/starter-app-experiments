import type { StoryObj } from "@storybook/react-vite";
import type { Node } from "@xyflow/react";
import type { BlackboxNodeData } from "../types";
import { type PipelineStoryArgs, pipelineStoryMeta } from "./story-utils";

const meta = {
  ...pipelineStoryMeta,
  title: "Pipeline/Slots",
};

export default meta;
type Story = StoryObj<PipelineStoryArgs>;

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

export const EmptySlot: Story = {
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

    nodeAppearance: "minimal",
    portShape: "square",
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
    position: { x: 0, y: 0 },
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

export const FilledSlot: Story = {
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

    nodeAppearance: "borderless"
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

// Interactive Drag-and-Drop Demo
const dragDropNodes: Node<BlackboxNodeData>[] = [
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
        },
      ],
    },
  },
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
