import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface QuestionNodeData {
  label: string;
  description: string;
  actions: string[];
}

const QuestionNode = memo(
  ({
    data,
    isConnectable,
    selected,
  }: {
    data: QuestionNodeData;
    isConnectable: boolean;
    selected: boolean;
  }) => {
    return (
      <div className="w-[200px]">
        <Handle
          type="target"
          position={Position.Top}
          id="a"
          isConnectable={isConnectable}
          className="opacity-0"
        />
        <div
          className={`
        text-center px-3 py-1 bg-purple-900 border-purple-500 border-1 rounded text-sm max-w-50
        transition-all duration-200 ease-in-out
        hover:bg-purple-800 hover:border-purple-400 hover:shadow-lg
        ${selected ? 'border-dashed border-2 border-purple-300 shadow-lg' : ''}
      `}
        >
          {data.label}
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          id="a"
          isConnectable={isConnectable}
          className="opacity-0"
        />
      </div>
    );
  }
);

export default QuestionNode;
