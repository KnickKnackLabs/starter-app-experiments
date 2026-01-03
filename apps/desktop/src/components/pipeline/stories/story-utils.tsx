import type { Decorator, Meta } from "@storybook/react-vite";
import type { Edge, Node } from "@xyflow/react";
import { PipelineEditor } from "../pipeline-editor";
import type { BlackboxNodeData, PortShape } from "../types";

// Port offset presets
export const portOffsetPresets = {
  "Outside (-4px)": -4,
  "On Edge (0px)": 0,
  "Inside (4px)": 4,
  "Deep Inside (8px)": 8,
} as const;

export type PortOffsetPreset = keyof typeof portOffsetPresets;

// Extended args type for our controls
export type PipelineStoryArgs = {
  initialNodes: Node<BlackboxNodeData>[];
  initialEdges: Edge[];
  portShape: PortShape;
  portOffsetPreset: PortOffsetPreset;
};

// Apply port settings to all nodes
export const applyPortSettings = (
  nodes: Node<BlackboxNodeData>[],
  shape: PortShape,
  offset: number
): Node<BlackboxNodeData>[] =>
  nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      portShape: shape,
      portOffset: offset,
    },
  }));

// Shared decorator that applies port settings
const portAppearanceDecoratorFn: Decorator<PipelineStoryArgs> = (
  _StoryComponent,
  context
) => {
  const { portShape, portOffsetPreset, initialNodes, initialEdges } =
    context.args;
  const portOffset = portOffsetPresets[portOffsetPreset];
  const modifiedNodes = applyPortSettings(
    initialNodes ?? [],
    portShape,
    portOffset
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <PipelineEditor
        initialEdges={initialEdges ?? []}
        initialNodes={modifiedNodes}
      />
    </div>
  );
};

// Shared meta configuration for pipeline stories
export const pipelineStoryMeta: Meta<PipelineStoryArgs> = {
  component: PipelineEditor,
  parameters: { layout: "fullscreen" },
  argTypes: {
    portShape: {
      control: "select",
      options: ["circle", "diamond", "square", "triangle"] as PortShape[],
      description: "Shape of port handles",
      table: { category: "Port Appearance" },
    },
    portOffsetPreset: {
      control: "select",
      options: Object.keys(portOffsetPresets),
      description: "Position of ports relative to node edge",
      table: { category: "Port Appearance" },
    },
  },
  args: {
    portShape: "circle",
    portOffsetPreset: "Deep Inside (8px)",
  },
  decorators: [portAppearanceDecoratorFn],
};
