import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui/components/ui/tooltip";
import { Handle, type NodeProps, Position } from "@xyflow/react";
import { memo } from "react";
import { type Port, portTypeColors } from "./types";

/** Category of AI node - determines color scheme */
export type AINodeCategory =
  | "model"
  | "prompt"
  | "data"
  | "transform"
  | "output"
  | "control";

/** Data stored in an AI pipeline node */
export interface AINodeData extends Record<string, unknown> {
  label: string;
  inputs: Port[];
  outputs: Port[];
  category: AINodeCategory;
  /** Icon displayed in header (emoji/unicode) */
  icon?: string;
  /** Subtitle shown below label */
  subtitle?: string;
  /** Model name badge (for model nodes) */
  model?: string;
  /** Temperature value (for model nodes) */
  temperature?: number;
  /** Status indicator */
  status?: "idle" | "running" | "success" | "error";
  /** Additional metadata to display */
  metadata?: { label: string; value: string }[];
}

/** Category color schemes */
const categoryStyles: Record<
  AINodeCategory,
  { bg: string; border: string; accent: string; icon: string }
> = {
  model: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    accent: "text-violet-600 dark:text-violet-400",
    icon: "🧠",
  },
  prompt: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    accent: "text-amber-600 dark:text-amber-400",
    icon: "💬",
  },
  data: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    accent: "text-blue-600 dark:text-blue-400",
    icon: "📊",
  },
  transform: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    accent: "text-emerald-600 dark:text-emerald-400",
    icon: "⚙️",
  },
  output: {
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    accent: "text-rose-600 dark:text-rose-400",
    icon: "📤",
  },
  control: {
    bg: "bg-slate-500/10",
    border: "border-slate-500/30",
    accent: "text-slate-600 dark:text-slate-400",
    icon: "🔀",
  },
};

/** Status indicator styles */
const statusStyles: Record<
  NonNullable<AINodeData["status"]>,
  { dot: string; pulse: boolean }
> = {
  idle: { dot: "bg-slate-400", pulse: false },
  running: { dot: "bg-amber-400", pulse: true },
  success: { dot: "bg-emerald-400", pulse: false },
  error: { dot: "bg-red-500", pulse: false },
};

function PortHandle({
  port,
  type,
  position,
  index,
  total,
}: {
  port: Port;
  type: "source" | "target";
  position: Position;
  index: number;
  total: number;
}) {
  const offset = total === 1 ? 50 : 20 + (index * 60) / Math.max(total - 1, 1);

  return (
    <div
      className="absolute"
      style={{
        [position === Position.Left ? "left" : "right"]: -4,
        top: `${offset}%`,
        transform: "translateY(-50%)",
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Handle
              className="!relative !h-2 !w-2 !transform-none !rounded-sm !border !border-background"
              id={port.id}
              position={position}
              style={{ backgroundColor: portTypeColors[port.type] }}
              type={type}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side={position === Position.Left ? "left" : "right"}>
          {port.label}{" "}
          <span style={{ color: portTypeColors[port.type] }}>
            ({port.type})
          </span>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

function StatusDot({ status }: { status: NonNullable<AINodeData["status"]> }) {
  const { dot, pulse } = statusStyles[status];
  return (
    <span className="relative flex h-2 w-2">
      {pulse ? (
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${dot}`}
        />
      ) : null}
      <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
    </span>
  );
}

function ModelBadge({ model }: { model: string }) {
  // Color based on model provider
  let badgeClass =
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";

  if (model.toLowerCase().includes("claude")) {
    badgeClass =
      "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300";
  } else if (model.toLowerCase().includes("gpt")) {
    badgeClass =
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300";
  } else if (model.toLowerCase().includes("gemini")) {
    badgeClass =
      "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300";
  } else if (model.toLowerCase().includes("llama")) {
    badgeClass =
      "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300";
  }

  return (
    <span
      className={`rounded px-1.5 py-0.5 font-medium text-[10px] ${badgeClass}`}
    >
      {model}
    </span>
  );
}

function TemperatureIndicator({ value }: { value: number }) {
  // Visual indicator: 0 = cold (blue), 1 = neutral, 2 = hot (red)
  const normalized = Math.min(Math.max(value, 0), 2);
  const percentage = (normalized / 2) * 100;

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] text-muted-foreground">temp</span>
      <div className="h-1 w-8 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-400 via-slate-400 to-red-400"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="font-mono text-[10px] text-muted-foreground">
        {value}
      </span>
    </div>
  );
}

type NodeHeaderProps = {
  icon: string;
  label: string;
  subtitle?: string;
  status?: AINodeData["status"];
  style: (typeof categoryStyles)[AINodeCategory];
};

function NodeHeader({ icon, label, subtitle, status, style }: NodeHeaderProps) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 ${style.bg}`}>
      <span className="text-sm">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className={`truncate font-medium text-sm ${style.accent}`}>
          {label}
        </div>
        {subtitle ? (
          <div className="truncate text-[10px] text-muted-foreground">
            {subtitle}
          </div>
        ) : null}
      </div>
      {status ? <StatusDot status={status} /> : null}
    </div>
  );
}

type NodeBodyProps = {
  model?: string;
  temperature?: number;
  metadata?: AINodeData["metadata"];
};

function NodeBody({ model, temperature, metadata }: NodeBodyProps) {
  return (
    <div className="space-y-2 px-3 py-2">
      {model ? (
        <div className="flex items-center gap-2">
          <ModelBadge model={model} />
          {temperature !== undefined ? (
            <TemperatureIndicator value={temperature} />
          ) : null}
        </div>
      ) : null}
      {(metadata?.length ?? 0) > 0 ? (
        <div className="space-y-1">
          {metadata?.map((item) => (
            <div className="flex justify-between text-[10px]" key={item.label}>
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-mono">{item.value}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

type NodeFooterProps = {
  inputs: Port[];
  outputs: Port[];
  hasBody: boolean;
};

function NodeFooter({ inputs, outputs, hasBody }: NodeFooterProps) {
  return (
    <div
      className={`flex justify-between px-3 py-2 text-[10px] text-muted-foreground ${hasBody ? "border-border/50 border-t bg-muted/30" : ""}`}
    >
      <div className="space-y-0.5">
        {inputs.map((p) => (
          <div className="flex items-center gap-1" key={p.id}>
            <span
              className="h-1.5 w-1.5 rounded-sm"
              style={{ backgroundColor: portTypeColors[p.type] }}
            />
            {p.label}
          </div>
        ))}
      </div>
      <div className="space-y-0.5 text-right">
        {outputs.map((p) => (
          <div className="flex items-center justify-end gap-1" key={p.id}>
            {p.label}
            <span
              className="h-1.5 w-1.5 rounded-sm"
              style={{ backgroundColor: portTypeColors[p.type] }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function AINodeComponent({ data, selected }: NodeProps) {
  const nodeData = data as AINodeData;
  const style = categoryStyles[nodeData.category];
  const icon = nodeData.icon ?? style.icon;

  const hasBody =
    Boolean(nodeData.model) || (nodeData.metadata?.length ?? 0) > 0;
  const hasFooter = nodeData.inputs.length > 0 || nodeData.outputs.length > 0;

  return (
    <div
      className={`relative min-w-[160px] overflow-hidden rounded-lg border bg-card shadow-sm transition-all ${
        selected ? "border-primary/50 shadow-md" : style.border
      }`}
    >
      <NodeHeader
        icon={icon}
        label={nodeData.label}
        status={nodeData.status}
        style={style}
        subtitle={nodeData.subtitle}
      />
      {hasBody ? (
        <NodeBody
          metadata={nodeData.metadata}
          model={nodeData.model}
          temperature={nodeData.temperature}
        />
      ) : null}
      {hasFooter ? (
        <NodeFooter
          hasBody={hasBody}
          inputs={nodeData.inputs}
          outputs={nodeData.outputs}
        />
      ) : null}

      {/* Input handles */}
      {nodeData.inputs.map((port, i) => (
        <PortHandle
          index={i}
          key={port.id}
          port={port}
          position={Position.Left}
          total={nodeData.inputs.length}
          type="target"
        />
      ))}

      {/* Output handles */}
      {nodeData.outputs.map((port, i) => (
        <PortHandle
          index={i}
          key={port.id}
          port={port}
          position={Position.Right}
          total={nodeData.outputs.length}
          type="source"
        />
      ))}
    </div>
  );
}

export const AINode = memo(AINodeComponent);
