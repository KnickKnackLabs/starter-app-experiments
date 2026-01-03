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

// Node appearance options
export const nodeAppearanceOptions = [
  "default",
  "sharp",
  "minimal",
  "borderless",
] as const;
export type NodeAppearanceOption = (typeof nodeAppearanceOptions)[number];

// Extended args type for our controls
export type PipelineStoryArgs = {
  initialNodes: Node<BlackboxNodeData>[];
  initialEdges: Edge[];
  portShape: PortShape;
  portOffsetPreset: PortOffsetPreset;
  nodeAppearance: NodeAppearanceOption;
};

// Apply visual settings to all nodes
// If a node already has an appearance set, preserve it (useful for comparison stories)
export const applyNodeSettings = (
  nodes: Node<BlackboxNodeData>[],
  shape: PortShape,
  offset: number,
  appearance: NodeAppearanceOption
): Node<BlackboxNodeData>[] =>
  nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      portShape: shape,
      portOffset: offset,
      // Preserve existing appearance if set, otherwise use the control value
      appearance: node.data.appearance ?? appearance,
    },
  }));

// Shared decorator that applies all node settings
const nodeSettingsDecoratorFn: Decorator<PipelineStoryArgs> = (
  _StoryComponent,
  context
) => {
  const {
    portShape,
    portOffsetPreset,
    nodeAppearance,
    initialNodes,
    initialEdges,
  } = context.args;
  const portOffset = portOffsetPresets[portOffsetPreset];
  const modifiedNodes = applyNodeSettings(
    initialNodes ?? [],
    portShape,
    portOffset,
    nodeAppearance
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
    nodeAppearance: {
      control: "select",
      options: nodeAppearanceOptions,
      description: "Node visual style variant",
      table: { category: "Node Appearance" },
    },
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
    nodeAppearance: "minimal",
    portShape: "square",
    portOffsetPreset: "On Edge (0px)",
  },
  decorators: [nodeSettingsDecoratorFn],
};
