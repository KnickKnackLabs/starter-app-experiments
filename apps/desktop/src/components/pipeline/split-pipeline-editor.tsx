import type { Edge, Node } from "@xyflow/react";
import { PipelineEditor } from "./pipeline-editor";
import type { BlackboxNodeData } from "./types";

type SplitPipelineEditorProps = {
  leftNodes?: Node<BlackboxNodeData>[];
  leftEdges?: Edge[];
  leftLabel?: string;
  rightNodes?: Node<BlackboxNodeData>[];
  rightEdges?: Edge[];
  rightLabel?: string;
};

export function SplitPipelineEditor({
  leftNodes = [],
  leftEdges = [],
  leftLabel = "Left",
  rightNodes = [],
  rightEdges = [],
  rightLabel = "Right",
}: SplitPipelineEditorProps) {
  return (
    <div className="flex h-full w-full gap-2 p-2">
      <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border/50">
        <div className="border-border/50 border-b bg-muted/30 px-3 py-1.5 font-medium text-muted-foreground text-xs">
          {leftLabel}
        </div>
        <div className="flex-1">
          <PipelineEditor initialEdges={leftEdges} initialNodes={leftNodes} />
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border/50">
        <div className="border-border/50 border-b bg-muted/30 px-3 py-1.5 font-medium text-muted-foreground text-xs">
          {rightLabel}
        </div>
        <div className="flex-1">
          <PipelineEditor initialEdges={rightEdges} initialNodes={rightNodes} />
        </div>
      </div>
    </div>
  );
}
