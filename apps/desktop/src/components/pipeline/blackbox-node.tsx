import { Handle, type NodeProps, Position } from "@xyflow/react";
import { memo } from "react";
import {
  type BlackboxNodeData,
  type NodeSlot,
  type Port,
  portTypeColors,
} from "./types";

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
      className="absolute flex items-center gap-1"
      style={{
        [position === Position.Left ? "left" : "right"]: -8,
        top: `${offset}%`,
        transform: "translateY(-50%)",
        flexDirection: position === Position.Left ? "row" : "row-reverse",
      }}
    >
      <Handle
        className="!relative !h-3 !w-3 !transform-none !rounded-full !border-2 !border-background"
        id={port.id}
        position={position}
        style={{ backgroundColor: portTypeColors[port.type] }}
        type={type}
      />
      <span
        className="whitespace-nowrap text-[10px] text-muted-foreground"
        style={{
          [position === Position.Left ? "marginLeft" : "marginRight"]: 4,
        }}
      >
        {port.label}
      </span>
    </div>
  );
}

/** Renders an empty slot waiting for a node */
function EmptySlot({ slot }: { slot: NodeSlot }) {
  const inputTypes = slot.accepts.inputs.map((p) => p.type).join(", ");
  const outputTypes = slot.accepts.outputs.map((p) => p.type).join(", ");

  return (
    <div className="my-2 rounded border-2 border-muted-foreground/30 border-dashed bg-muted/20 p-3">
      <div className="mb-1 text-center text-muted-foreground text-xs">
        {slot.label}
      </div>
      <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground/60">
        <span>({inputTypes || "∅"})</span>
        <span>→</span>
        <span>({outputTypes || "∅"})</span>
      </div>
    </div>
  );
}

/** Renders a filled slot with a nested node representation */
function FilledSlot({
  slot,
  slottedNodeData,
}: {
  slot: NodeSlot;
  slottedNodeData: BlackboxNodeData;
}) {
  return (
    <div className="my-2 rounded border-2 border-primary/30 bg-primary/5 p-2">
      <div className="rounded border border-border bg-card px-3 py-2 shadow-sm">
        <div className="text-center font-medium text-xs">
          {slottedNodeData.label}
        </div>
        <div className="mt-1 flex items-center justify-center gap-2">
          {/* Mini port indicators */}
          <div className="flex gap-1">
            {slottedNodeData.inputs.map((p) => (
              <div
                className="h-2 w-2 rounded-full"
                key={p.id}
                style={{ backgroundColor: portTypeColors[p.type] }}
                title={`${p.label}: ${p.type}`}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">→</span>
          <div className="flex gap-1">
            {slottedNodeData.outputs.map((p) => (
              <div
                className="h-2 w-2 rounded-full"
                key={p.id}
                style={{ backgroundColor: portTypeColors[p.type] }}
                title={`${p.label}: ${p.type}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export interface BlackboxNodeProps extends NodeProps {
  /** For rendering filled slots, we need access to other nodes' data */
  getNodeData?: (nodeId: string) => BlackboxNodeData | undefined;
}

function BlackboxNodeComponent({
  data,
  selected,
  getNodeData,
}: BlackboxNodeProps) {
  const nodeData = data as BlackboxNodeData;
  const hasSlots = nodeData.slots && nodeData.slots.length > 0;

  return (
    <div
      className={`relative min-w-[120px] rounded-lg border-2 bg-card px-4 py-3 shadow-md ${selected ? "border-primary" : "border-border"}`}
    >
      {/* Node label */}
      <div className="text-center font-medium text-sm">{nodeData.label}</div>

      {/* Slots */}
      {hasSlots && (
        <div className="mt-2">
          {nodeData.slots?.map((slot) => {
            const slottedNodeData = slot.filledBy
              ? getNodeData?.(slot.filledBy)
              : undefined;

            return slottedNodeData ? (
              <FilledSlot
                key={slot.id}
                slot={slot}
                slottedNodeData={slottedNodeData}
              />
            ) : (
              <EmptySlot key={slot.id} slot={slot} />
            );
          })}
        </div>
      )}

      {/* Input handles (left side) */}
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

      {/* Output handles (right side) */}
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

export const BlackboxNode = memo(BlackboxNodeComponent);
