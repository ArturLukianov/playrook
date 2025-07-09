import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";

export default memo(({ data, isConnectable, selected }) => {
  console.log(data.label);
  console.log(selected);
  if (selected) {
    return <></>
  }
  return (
    <div className="w-[200px]">
        <Handle
          type="target"
          position={Position.Top}
          id="a"
          isConnectable={isConnectable}
          className="opacity-0"
        />
        <div className={"text-center px-3 py-1 bg-blue-900 border-blue-500 border-1 rounded text-sm max-w-50 "}>
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
});
