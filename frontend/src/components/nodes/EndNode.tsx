import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface EndNodeData {
  label: string;
  description: string;
  actions: string[];
}

const EndNode = memo(
  ({
    data,
    isConnectable,
    selected,
  }: {
    data: EndNodeData;
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
        text-center px-3 py-1 bg-orange-900 border-orange-500 border-1 rounded text-sm max-w-50
        transition-all duration-200 ease-in-out
        hover:bg-orange-800 hover:border-orange-400 hover:shadow-lg
        ${selected ? 'border-dashed border-2 border-orange-300 shadow-lg' : ''}
      `}
        >
          {data.label}
        </div>
      </div>
    );
  }
);

export default EndNode;
