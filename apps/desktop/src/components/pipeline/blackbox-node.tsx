import { Handle, type NodeProps, Position } from "@xyflow/react";
import { memo } from "react";
import { type BlackboxNodeData, type Port, portTypeColors } from "./types";

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
        className="!relative !transform-none !h-3 !w-3 !rounded-full !border-2 !border-background"
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

function BlackboxNodeComponent({ data, selected }: NodeProps) {
  const nodeData = data as BlackboxNodeData;

  return (
    <div
      className={`relative min-w-[120px] rounded-lg border-2 bg-card px-4 py-3 shadow-md ${selected ? "border-primary" : "border-border"}
      `}
    >
      {/* Node label */}
      <div className="text-center font-medium text-sm">{nodeData.label}</div>

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
