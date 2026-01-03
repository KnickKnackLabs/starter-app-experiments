import { createContext, useContext } from "react";
import type { BlackboxNodeData } from "./types";

type PipelineContextValue = {
  getNodeData: (nodeId: string) => BlackboxNodeData | undefined;
  onSlotClear: (parentNodeId: string, slotId: string) => void;
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
