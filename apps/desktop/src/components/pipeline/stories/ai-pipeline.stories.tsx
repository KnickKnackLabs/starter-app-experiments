import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Background,
  Controls,
  type Edge,
  MiniMap,
  type Node,
  ReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AINode, type AINodeData } from "../ai-node";

const nodeTypes = { ai: AINode };

type AIStoryArgs = {
  nodes: Node<AINodeData>[];
  edges: Edge[];
};

const meta: Meta<AIStoryArgs> = {
  title: "Pipeline/AI Nodes",
  parameters: { layout: "fullscreen" },
  decorators: [
    (_, { args }) => (
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlowProvider>
          <ReactFlow
            className="bg-muted"
            edges={args.edges}
            fitView
            fitViewOptions={{ maxZoom: 1 }}
            nodes={args.nodes}
            nodeTypes={nodeTypes}
            snapGrid={[8, 8]}
            snapToGrid
          >
            <Background className="!bg-muted" gap={16} size={1} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<AIStoryArgs>;

// Showcase all node categories
const showcaseNodes: Node<AINodeData>[] = [
  {
    id: "model-1",
    type: "ai",
    position: { x: 50, y: 50 },
    data: {
      label: "Generate Text",
      category: "model",
      model: "Claude 3.5 Sonnet",
      temperature: 0.7,
      status: "idle",
      inputs: [{ id: "prompt", label: "prompt", type: "string" }],
      outputs: [{ id: "text", label: "text", type: "string" }],
    },
  },
  {
    id: "model-2",
    type: "ai",
    position: { x: 50, y: 220 },
    data: {
      label: "Chat Completion",
      category: "model",
      model: "GPT-4 Turbo",
      temperature: 1.0,
      status: "running",
      inputs: [
        { id: "messages", label: "messages", type: "array" },
        { id: "system", label: "system", type: "string" },
      ],
      outputs: [{ id: "response", label: "response", type: "object" }],
    },
  },
  {
    id: "prompt-1",
    type: "ai",
    position: { x: 300, y: 50 },
    data: {
      label: "Summarizer",
      subtitle: "Condense text to key points",
      category: "prompt",
      inputs: [{ id: "text", label: "text", type: "string" }],
      outputs: [{ id: "prompt", label: "prompt", type: "string" }],
      metadata: [
        { label: "max tokens", value: "500" },
        { label: "style", value: "bullets" },
      ],
    },
  },
  {
    id: "data-1",
    type: "ai",
    position: { x: 300, y: 220 },
    data: {
      label: "Load Documents",
      subtitle: "PDF, DOCX, TXT",
      category: "data",
      icon: "📁",
      inputs: [],
      outputs: [
        { id: "docs", label: "docs", type: "array" },
        { id: "count", label: "count", type: "number" },
      ],
      metadata: [
        { label: "files", value: "12" },
        { label: "size", value: "2.4 MB" },
      ],
    },
  },
  {
    id: "transform-1",
    type: "ai",
    position: { x: 550, y: 50 },
    data: {
      label: "Chunk Text",
      subtitle: "Split into overlapping chunks",
      category: "transform",
      inputs: [{ id: "text", label: "text", type: "string" }],
      outputs: [{ id: "chunks", label: "chunks", type: "array" }],
      metadata: [
        { label: "size", value: "1000" },
        { label: "overlap", value: "200" },
      ],
    },
  },
  {
    id: "transform-2",
    type: "ai",
    position: { x: 550, y: 220 },
    data: {
      label: "Embed",
      subtitle: "text-embedding-3-small",
      category: "transform",
      icon: "🔢",
      status: "success",
      inputs: [{ id: "text", label: "text", type: "string" }],
      outputs: [{ id: "vector", label: "vector", type: "array" }],
      metadata: [{ label: "dims", value: "1536" }],
    },
  },
  {
    id: "output-1",
    type: "ai",
    position: { x: 800, y: 50 },
    data: {
      label: "Stream Response",
      category: "output",
      icon: "📡",
      inputs: [{ id: "text", label: "text", type: "string" }],
      outputs: [],
    },
  },
  {
    id: "control-1",
    type: "ai",
    position: { x: 800, y: 180 },
    data: {
      label: "If / Else",
      subtitle: "Branch on condition",
      category: "control",
      inputs: [
        { id: "condition", label: "condition", type: "boolean" },
        { id: "data", label: "data", type: "any" },
      ],
      outputs: [
        { id: "true", label: "true", type: "any" },
        { id: "false", label: "false", type: "any" },
      ],
    },
  },
];

export const NodeShowcase: Story = {
  args: {
    nodes: showcaseNodes,
    edges: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Showcase of all AI node categories: Model (purple), Prompt (amber), Data (blue), Transform (green), Output (rose), and Control (slate).",
      },
    },
  },
};

// RAG Pipeline example
const ragNodes: Node<AINodeData>[] = [
  {
    id: "docs",
    type: "ai",
    position: { x: 50, y: 150 },
    data: {
      label: "Knowledge Base",
      subtitle: "Company docs & FAQs",
      category: "data",
      icon: "📚",
      inputs: [],
      outputs: [{ id: "docs", label: "docs", type: "array" }],
      metadata: [
        { label: "documents", value: "1,247" },
        { label: "updated", value: "2h ago" },
      ],
    },
  },
  {
    id: "query",
    type: "ai",
    position: { x: 50, y: 350 },
    data: {
      label: "User Query",
      category: "data",
      icon: "💭",
      inputs: [],
      outputs: [{ id: "query", label: "query", type: "string" }],
    },
  },
  {
    id: "embed-docs",
    type: "ai",
    position: { x: 300, y: 100 },
    data: {
      label: "Embed Documents",
      category: "transform",
      icon: "🔢",
      status: "success",
      inputs: [{ id: "docs", label: "docs", type: "array" }],
      outputs: [{ id: "vectors", label: "vectors", type: "array" }],
      metadata: [{ label: "model", value: "ada-002" }],
    },
  },
  {
    id: "embed-query",
    type: "ai",
    position: { x: 300, y: 300 },
    data: {
      label: "Embed Query",
      category: "transform",
      icon: "🔢",
      inputs: [{ id: "query", label: "query", type: "string" }],
      outputs: [{ id: "vector", label: "vector", type: "array" }],
    },
  },
  {
    id: "search",
    type: "ai",
    position: { x: 550, y: 180 },
    data: {
      label: "Vector Search",
      subtitle: "Top-k similarity",
      category: "transform",
      icon: "🔍",
      inputs: [
        { id: "query-vec", label: "query", type: "array" },
        { id: "doc-vecs", label: "docs", type: "array" },
      ],
      outputs: [{ id: "results", label: "results", type: "array" }],
      metadata: [
        { label: "top-k", value: "5" },
        { label: "threshold", value: "0.8" },
      ],
    },
  },
  {
    id: "prompt",
    type: "ai",
    position: { x: 800, y: 180 },
    data: {
      label: "RAG Prompt",
      subtitle: "Inject context",
      category: "prompt",
      inputs: [
        { id: "query", label: "query", type: "string" },
        { id: "context", label: "context", type: "array" },
      ],
      outputs: [{ id: "prompt", label: "prompt", type: "string" }],
    },
  },
  {
    id: "llm",
    type: "ai",
    position: { x: 1050, y: 180 },
    data: {
      label: "Generate Answer",
      category: "model",
      model: "Claude 3.5 Sonnet",
      temperature: 0.3,
      status: "running",
      inputs: [{ id: "prompt", label: "prompt", type: "string" }],
      outputs: [{ id: "answer", label: "answer", type: "string" }],
    },
  },
  {
    id: "output",
    type: "ai",
    position: { x: 1300, y: 180 },
    data: {
      label: "Response",
      category: "output",
      icon: "💬",
      inputs: [{ id: "text", label: "text", type: "string" }],
      outputs: [],
    },
  },
];

const ragEdges: Edge[] = [
  {
    id: "e1",
    source: "docs",
    sourceHandle: "docs",
    target: "embed-docs",
    targetHandle: "docs",
  },
  {
    id: "e2",
    source: "query",
    sourceHandle: "query",
    target: "embed-query",
    targetHandle: "query",
  },
  {
    id: "e3",
    source: "embed-docs",
    sourceHandle: "vectors",
    target: "search",
    targetHandle: "doc-vecs",
  },
  {
    id: "e4",
    source: "embed-query",
    sourceHandle: "vector",
    target: "search",
    targetHandle: "query-vec",
  },
  {
    id: "e5",
    source: "search",
    sourceHandle: "results",
    target: "prompt",
    targetHandle: "context",
  },
  {
    id: "e6",
    source: "query",
    sourceHandle: "query",
    target: "prompt",
    targetHandle: "query",
  },
  {
    id: "e7",
    source: "prompt",
    sourceHandle: "prompt",
    target: "llm",
    targetHandle: "prompt",
  },
  {
    id: "e8",
    source: "llm",
    sourceHandle: "answer",
    target: "output",
    targetHandle: "text",
  },
];

export const RAGPipeline: Story = {
  args: {
    nodes: ragNodes,
    edges: ragEdges,
  },
  parameters: {
    docs: {
      description: {
        story:
          "A complete Retrieval-Augmented Generation (RAG) pipeline: documents are embedded and stored, user queries are embedded and matched via vector search, relevant context is injected into the prompt, and an LLM generates the final answer.",
      },
    },
  },
};

// Agent workflow example
const agentNodes: Node<AINodeData>[] = [
  {
    id: "input",
    type: "ai",
    position: { x: 50, y: 200 },
    data: {
      label: "User Request",
      category: "data",
      icon: "🎯",
      inputs: [],
      outputs: [{ id: "request", label: "request", type: "string" }],
    },
  },
  {
    id: "planner",
    type: "ai",
    position: { x: 300, y: 200 },
    data: {
      label: "Task Planner",
      subtitle: "Decompose into steps",
      category: "model",
      model: "Claude 3.5 Sonnet",
      temperature: 0.2,
      inputs: [{ id: "request", label: "request", type: "string" }],
      outputs: [{ id: "plan", label: "plan", type: "array" }],
    },
  },
  {
    id: "router",
    type: "ai",
    position: { x: 550, y: 200 },
    data: {
      label: "Tool Router",
      subtitle: "Select appropriate tool",
      category: "control",
      inputs: [{ id: "step", label: "step", type: "object" }],
      outputs: [
        { id: "search", label: "search", type: "object" },
        { id: "code", label: "code", type: "object" },
        { id: "api", label: "api", type: "object" },
      ],
    },
  },
  {
    id: "search-tool",
    type: "ai",
    position: { x: 800, y: 80 },
    data: {
      label: "Web Search",
      category: "transform",
      icon: "🌐",
      inputs: [{ id: "query", label: "query", type: "object" }],
      outputs: [{ id: "results", label: "results", type: "array" }],
    },
  },
  {
    id: "code-tool",
    type: "ai",
    position: { x: 800, y: 200 },
    data: {
      label: "Code Executor",
      category: "transform",
      icon: "💻",
      status: "running",
      inputs: [{ id: "code", label: "code", type: "object" }],
      outputs: [{ id: "output", label: "output", type: "any" }],
      metadata: [{ label: "runtime", value: "Python" }],
    },
  },
  {
    id: "api-tool",
    type: "ai",
    position: { x: 800, y: 330 },
    data: {
      label: "API Call",
      category: "transform",
      icon: "🔌",
      inputs: [{ id: "request", label: "request", type: "object" }],
      outputs: [{ id: "response", label: "response", type: "object" }],
    },
  },
  {
    id: "aggregator",
    type: "ai",
    position: { x: 1050, y: 200 },
    data: {
      label: "Result Aggregator",
      category: "transform",
      icon: "📦",
      inputs: [{ id: "results", label: "results", type: "array" }],
      outputs: [{ id: "combined", label: "combined", type: "object" }],
    },
  },
  {
    id: "synthesizer",
    type: "ai",
    position: { x: 1300, y: 200 },
    data: {
      label: "Response Synthesizer",
      category: "model",
      model: "GPT-4 Turbo",
      temperature: 0.5,
      inputs: [
        { id: "plan", label: "plan", type: "array" },
        { id: "results", label: "results", type: "object" },
      ],
      outputs: [{ id: "response", label: "response", type: "string" }],
    },
  },
];

const agentEdges: Edge[] = [
  {
    id: "e1",
    source: "input",
    sourceHandle: "request",
    target: "planner",
    targetHandle: "request",
  },
  {
    id: "e2",
    source: "planner",
    sourceHandle: "plan",
    target: "router",
    targetHandle: "step",
  },
  {
    id: "e3",
    source: "router",
    sourceHandle: "search",
    target: "search-tool",
    targetHandle: "query",
  },
  {
    id: "e4",
    source: "router",
    sourceHandle: "code",
    target: "code-tool",
    targetHandle: "code",
  },
  {
    id: "e5",
    source: "router",
    sourceHandle: "api",
    target: "api-tool",
    targetHandle: "request",
  },
  {
    id: "e6",
    source: "planner",
    sourceHandle: "plan",
    target: "synthesizer",
    targetHandle: "plan",
  },
  {
    id: "e7",
    source: "aggregator",
    sourceHandle: "combined",
    target: "synthesizer",
    targetHandle: "results",
  },
];

export const AgentWorkflow: Story = {
  args: {
    nodes: agentNodes,
    edges: agentEdges,
  },
  parameters: {
    docs: {
      description: {
        story:
          "An AI agent workflow: user requests are decomposed into tasks by a planner, routed to appropriate tools (search, code execution, API calls), results are aggregated, and a final response is synthesized.",
      },
    },
  },
};

// Model comparison
const modelNodes: Node<AINodeData>[] = [
  {
    id: "claude-sonnet",
    type: "ai",
    position: { x: 50, y: 50 },
    data: {
      label: "Claude 3.5 Sonnet",
      category: "model",
      model: "Claude 3.5 Sonnet",
      temperature: 0.7,
      status: "idle",
      inputs: [{ id: "prompt", label: "prompt", type: "string" }],
      outputs: [{ id: "text", label: "text", type: "string" }],
      metadata: [
        { label: "context", value: "200K" },
        { label: "$/M tok", value: "$3/$15" },
      ],
    },
  },
  {
    id: "claude-opus",
    type: "ai",
    position: { x: 50, y: 220 },
    data: {
      label: "Claude 3 Opus",
      category: "model",
      model: "Claude 3 Opus",
      temperature: 0.5,
      status: "idle",
      inputs: [{ id: "prompt", label: "prompt", type: "string" }],
      outputs: [{ id: "text", label: "text", type: "string" }],
      metadata: [
        { label: "context", value: "200K" },
        { label: "$/M tok", value: "$15/$75" },
      ],
    },
  },
  {
    id: "gpt4-turbo",
    type: "ai",
    position: { x: 300, y: 50 },
    data: {
      label: "GPT-4 Turbo",
      category: "model",
      model: "GPT-4 Turbo",
      temperature: 0.8,
      status: "running",
      inputs: [{ id: "prompt", label: "prompt", type: "string" }],
      outputs: [{ id: "text", label: "text", type: "string" }],
      metadata: [
        { label: "context", value: "128K" },
        { label: "$/M tok", value: "$10/$30" },
      ],
    },
  },
  {
    id: "gpt4o",
    type: "ai",
    position: { x: 300, y: 220 },
    data: {
      label: "GPT-4o",
      category: "model",
      model: "GPT-4o",
      temperature: 1.0,
      status: "success",
      inputs: [{ id: "prompt", label: "prompt", type: "string" }],
      outputs: [{ id: "text", label: "text", type: "string" }],
      metadata: [
        { label: "context", value: "128K" },
        { label: "$/M tok", value: "$5/$15" },
      ],
    },
  },
  {
    id: "gemini",
    type: "ai",
    position: { x: 550, y: 50 },
    data: {
      label: "Gemini 1.5 Pro",
      category: "model",
      model: "Gemini 1.5 Pro",
      temperature: 0.9,
      status: "idle",
      inputs: [{ id: "prompt", label: "prompt", type: "string" }],
      outputs: [{ id: "text", label: "text", type: "string" }],
      metadata: [
        { label: "context", value: "1M" },
        { label: "$/M tok", value: "$3.50/$10.50" },
      ],
    },
  },
  {
    id: "llama",
    type: "ai",
    position: { x: 550, y: 220 },
    data: {
      label: "Llama 3 70B",
      category: "model",
      model: "Llama 3 70B",
      temperature: 0.6,
      status: "error",
      inputs: [{ id: "prompt", label: "prompt", type: "string" }],
      outputs: [{ id: "text", label: "text", type: "string" }],
      metadata: [
        { label: "context", value: "8K" },
        { label: "$/M tok", value: "$0.70/$0.90" },
      ],
    },
  },
];

export const ModelComparison: Story = {
  args: {
    nodes: modelNodes,
    edges: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Comparison of different LLM providers with model badges, temperature indicators, and metadata showing context windows and pricing.",
      },
    },
  },
};
