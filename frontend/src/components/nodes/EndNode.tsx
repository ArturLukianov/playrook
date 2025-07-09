import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";

export default memo(({ data, isConnectable }) => {
  return (
    <div className="w-[200px]">
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        isConnectable={isConnectable}
        className="opacity-0"
      />
      <div className="text-center px-3 py-1 bg-orange-900 border-orange-500 border-1 rounded text-sm max-w-50">
        {data.label}
      </div>
    </div>
  );
});
