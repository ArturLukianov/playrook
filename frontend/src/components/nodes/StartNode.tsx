import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface StartNodeData {
  label: string;
  description: string;
  actions: string[];
}

const StartNode = memo(
  ({
    data,
    isConnectable,
    selected,
  }: {
    data: StartNodeData;
    isConnectable: boolean;
    selected: boolean;
  }) => {
    return (
      <div className="w-[200px]">
        <div
          className={`
        text-center px-3 py-1 bg-green-900 border-green-500 border-1 rounded text-sm max-w-50
        transition-all duration-200 ease-in-out
        hover:bg-green-800 hover:border-green-400 hover:shadow-lg
        ${selected ? 'border-dashed border-2 border-green-300 shadow-lg' : ''}
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

export default StartNode;
