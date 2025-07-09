import React, { memo } from 'react'
import { Handle, Position } from '@xyflow/react'

export default memo(({ data, isConnectable }) => {
  return (
    <div className="w-[200px]">
      <div className="text-center px-3 py-1 bg-green-900 border-green-500 border-1 rounded text-sm max-w-50">
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
  )
})
