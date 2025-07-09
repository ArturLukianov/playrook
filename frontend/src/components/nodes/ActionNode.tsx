import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface ActionNodeData {
  label: string;
  description: string;
  actions: string[];
}

const ActionNode = memo(
  ({
    data,
    isConnectable,
    selected,
  }: {
    data: ActionNodeData;
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
          text-center px-3 py-1 bg-blue-900 border-blue-500 border-1 rounded text-sm max-w-50
          transition-all duration-200 ease-in-out
          hover:bg-blue-800 hover:border-blue-400 hover:shadow-lg
          ${selected ? 'border-dashed border-2 border-blue-300 shadow-lg' : ''}
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

export default ActionNode;
