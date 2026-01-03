import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui/components/ui/tooltip";
import { Handle, type NodeProps, Position } from "@xyflow/react";
import { memo } from "react";
import { usePipelineContext } from "./pipeline-context";
import {
  type BlackboxNodeData,
  type NodeSlot,
  type Port,
  type PortShape,
  portTypeColors,
} from "./types";

type PortShapeStyle = {
  borderRadius: string;
  transform?: string;
  clipPath?: string;
};

type NodeAppearanceStyles = {
  container: string;
  selected: string;
  unselected: string;
};

function getNodeAppearanceStyles(
  appearance: "default" | "sharp" | "minimal" | "borderless" = "minimal"
): NodeAppearanceStyles {
  // Use muted background for subtle contrast against white/dark grid
  // bg-muted is slightly off-white in light mode, slightly lighter in dark mode
  // Selection uses a consistent thin primary/50 border across all variants
  switch (appearance) {
    case "sharp":
      // Sharp corners, thin border, subtle shadow
      return {
        container: "rounded-sm border bg-muted shadow-sm",
        selected: "border-primary/50",
        unselected: "border-border",
      };
    case "minimal":
      // Square corners, thin border, no shadow
      return {
        container: "rounded-none border bg-muted",
        selected: "border-primary/50",
        unselected: "border-border",
      };
    case "borderless":
      // No border when unselected, thin border when selected
      return {
        container: "rounded-md border bg-muted shadow-md",
        selected: "border-primary/50",
        unselected: "border-transparent",
      };
    default:
      // Original: rounded, thin border, medium shadow
      return {
        container: "rounded-lg border bg-muted shadow-md",
        selected: "border-primary/50",
        unselected: "border-border",
      };
  }
}

function getPortShapeStyle(shape: PortShape, isInput: boolean): PortShapeStyle {
  switch (shape) {
    case "circle":
      return { borderRadius: "50%" };
    case "diamond":
      return { borderRadius: "2px", transform: "rotate(45deg)" };
    case "square":
      return { borderRadius: "2px" };
    case "triangle":
      return {
        borderRadius: "0",
        clipPath: isInput
          ? "polygon(100% 0%, 0% 50%, 100% 100%)" // Points left (into node)
          : "polygon(0% 0%, 100% 50%, 0% 100%)", // Points right (out of node)
      };
    default:
      return { borderRadius: "50%" };
  }
}

function PortHandle({
  port,
  type,
  position,
  index,
  total,
  shape = "circle",
  horizontalOffset = -4,
}: {
  port: Port;
  type: "source" | "target";
  position: Position;
  index: number;
  total: number;
  shape?: PortShape;
  horizontalOffset?: number;
}) {
  const offset = total === 1 ? 50 : 20 + (index * 60) / Math.max(total - 1, 1);
  const shapeStyle = getPortShapeStyle(shape, type === "target");
  const isDiamond = shape === "diamond";

  // Port is 8px wide, so center it by default (-4px puts center at edge)
  const adjustedOffset = horizontalOffset - 4;

  return (
    <div
      className="absolute"
      style={{
        [position === Position.Left ? "left" : "right"]: adjustedOffset,
        top: `${offset}%`,
        transform: "translateY(-50%)",
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          {/* Wrapper div for diamond rotation since Handle's !transform-none blocks inline transform */}
          <div style={{ transform: isDiamond ? "rotate(45deg)" : "none" }}>
            <Handle
              className="!relative !h-2 !w-2 !transform-none !border !border-background"
              id={port.id}
              position={position}
              style={{
                backgroundColor: portTypeColors[port.type],
                borderRadius: shapeStyle.borderRadius,
                clipPath: shapeStyle.clipPath,
              }}
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

/** Renders an empty slot waiting for a node */
function EmptySlot({
  slot,
  parentNodeId,
}: {
  slot: NodeSlot;
  parentNodeId: string;
}) {
  const { dragState, registerSlotRef } = usePipelineContext();
  const inputTypes = slot.accepts.inputs.map((p) => p.type).join(", ");
  const outputTypes = slot.accepts.outputs.map((p) => p.type).join(", ");

  // Register this slot's DOM element for overlap detection
  const slotKey = `${parentNodeId}:${slot.id}`;

  // Check if the currently dragged node is compatible with this slot
  const isCompatible = dragState?.compatibleSlots.some(
    (cs) => cs.parentNodeId === parentNodeId && cs.slot.id === slot.id
  );

  // Check if the dragged node is overlapping this specific slot
  const isOverlapping = dragState?.overlappingSlotKeys.has(slotKey);

  // Only show incompatible state when overlapping
  const showIncompatible = isOverlapping && !isCompatible;

  let borderClass = "border-muted-foreground/30 border-dashed";
  let bgClass = "bg-muted/20";
  let hintText = "drag a node here";

  if (isCompatible && isOverlapping) {
    borderClass = "border-primary border-solid";
    bgClass = "bg-primary/10";
    hintText = "drop here!";
  } else if (isCompatible) {
    // Compatible but not overlapping yet - subtle highlight
    borderClass = "border-primary/50 border-dashed";
    bgClass = "bg-primary/5";
  } else if (showIncompatible) {
    borderClass = "border-destructive/50 border-dashed";
    bgClass = "bg-destructive/5";
    hintText = "incompatible";
  }

  return (
    <div
      className={`my-2 rounded border-2 ${borderClass} ${bgClass} p-3 transition-colors`}
      ref={(el) => registerSlotRef(parentNodeId, slot.id, el)}
    >
      <div className="mb-1 text-center text-muted-foreground text-xs">
        {slot.label}
      </div>
      <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground/60">
        <span>({inputTypes || "∅"})</span>
        <span>→</span>
        <span>({outputTypes || "∅"})</span>
      </div>
      <div className="mt-1 text-center text-[9px] text-muted-foreground/40">
        {hintText}
      </div>
    </div>
  );
}

/** Renders a filled slot with a nested node representation */
function FilledSlot({
  slot,
  slottedNodeData,
  parentNodeId,
  onSlotClear,
}: {
  slot: NodeSlot;
  slottedNodeData: BlackboxNodeData;
  parentNodeId: string;
  onSlotClear?: (parentNodeId: string, slotId: string) => void;
}) {
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onSlotClear?.(parentNodeId, slot.id);
  };

  return (
    <button
      className="group my-2 block w-full rounded border-2 border-primary/30 bg-primary/5 p-2 text-left"
      onDoubleClick={handleDoubleClick}
      title="Double-click to remove"
      type="button"
    >
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
    </button>
  );
}

function BlackboxNodeComponent({ id, data, selected }: NodeProps) {
  const { getNodeData, onSlotClear } = usePipelineContext();
  const nodeData = data as BlackboxNodeData;
  const hasSlots = nodeData.slots && nodeData.slots.length > 0;
  const appearanceStyles = getNodeAppearanceStyles(nodeData.appearance);

  return (
    <div
      className={`relative min-w-[120px] px-4 py-3 ${appearanceStyles.container} ${selected ? appearanceStyles.selected : appearanceStyles.unselected}`}
    >
      {/* Node label */}
      <div className="text-center font-medium text-sm">{nodeData.label}</div>

      {/* Slots */}
      {hasSlots ? (
        <div className="mt-2">
          {nodeData.slots?.map((slot) => {
            const slottedNodeData = slot.filledBy
              ? getNodeData(slot.filledBy)
              : null;

            return slottedNodeData ? (
              <FilledSlot
                key={slot.id}
                onSlotClear={onSlotClear}
                parentNodeId={id}
                slot={slot}
                slottedNodeData={slottedNodeData}
              />
            ) : (
              <EmptySlot key={slot.id} parentNodeId={id} slot={slot} />
            );
          })}
        </div>
      ) : null}

      {/* Input handles (left side) */}
      {nodeData.inputs.map((port, i) => (
        <PortHandle
          horizontalOffset={nodeData.portOffset}
          index={i}
          key={port.id}
          port={port}
          position={Position.Left}
          shape={nodeData.portShape}
          total={nodeData.inputs.length}
          type="target"
        />
      ))}

      {/* Output handles (right side) */}
      {nodeData.outputs.map((port, i) => (
        <PortHandle
          horizontalOffset={nodeData.portOffset}
          index={i}
          key={port.id}
          port={port}
          position={Position.Right}
          shape={nodeData.portShape}
          total={nodeData.outputs.length}
          type="source"
        />
      ))}
    </div>
  );
}

export const BlackboxNode = memo(BlackboxNodeComponent);
