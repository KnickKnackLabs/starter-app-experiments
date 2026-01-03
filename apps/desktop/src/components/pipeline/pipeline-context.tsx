import { createContext, useContext } from "react";
import type { BlackboxNodeData, NodeSlot } from "./types";

/** Info about a node currently being dragged */
export type DragState = {
  nodeId: string;
  nodeData: BlackboxNodeData;
  /** Slots that this node can fill (computed during drag) */
  compatibleSlots: Array<{ parentNodeId: string; slot: NodeSlot }>;
  /** Slots currently being overlapped by the dragged node (parentNodeId:slotId) */
  overlappingSlotKeys: Set<string>;
} | null;

/** Create a unique key for a slot */
export function slotKey(parentNodeId: string, slotId: string): string {
  return `${parentNodeId}:${slotId}`;
}

type PipelineContextValue = {
  getNodeData: (nodeId: string) => BlackboxNodeData | undefined;
  onSlotClear: (parentNodeId: string, slotId: string) => void;
  /** Current drag state for visual feedback */
  dragState: DragState;
  /** Register a slot element for overlap detection */
  registerSlotRef: (
    parentNodeId: string,
    slotId: string,
    element: HTMLElement | null
  ) => void;
  /** Get all registered slot refs */
  getSlotRefs: () => Map<string, HTMLElement>;
};

export const PipelineContext = createContext<PipelineContextValue | null>(null);

export function usePipelineContext() {
  const context = useContext(PipelineContext);
  if (!context) {
    throw new Error(
      "usePipelineContext must be used within a PipelineProvider"
    );
  }
  return context;
}
