import { Background, Controls, Edge, Node, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import StartNode from '@/components/nodes/StartNode';
import EndNode from '@/components/nodes/EndNode';
import QuestionNode from '@/components/nodes/QuestionNode';
import ActionNode from '@/components/nodes/ActionNode';
import { NodeDetailsPanel } from './NodeDetailsPanel';

const nodeTypes = {
  startNode: StartNode,
  endNode: EndNode,
  questionNode: QuestionNode,
  actionNode: ActionNode,
};

interface NodeData extends Record<string, unknown> {
  label: string;
  description: string;
  actions: string[];
}

interface PlaybookGraphViewProps {
  nodes: Node<NodeData>[];
  edges: Edge[];
  selectedNode: Node<NodeData> | undefined;
  onNodeClick: (event: React.MouseEvent, node: Node<NodeData>) => void;
}

export function PlaybookGraphView({
  nodes,
  edges,
  selectedNode,
  onNodeClick,
}: PlaybookGraphViewProps) {
  return (
    <div className="relative w-full h-full">
      <ReactFlow
        colorMode="dark"
        proOptions={{ hideAttribution: true }}
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        edgesReconnectable={false}
        nodesDraggable={false}
        onNodeClick={onNodeClick}
        nodesConnectable={false}
        fitView
        className={selectedNode ? 'md:mr-80 lg:mr-96' : ''}
      >
        <Background />
        <Controls />
      </ReactFlow>
      <NodeDetailsPanel selectedNode={selectedNode} />
    </div>
  );
}
