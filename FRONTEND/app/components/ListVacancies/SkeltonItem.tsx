import React from 'react'
import { Skeleton } from 'antd';

const SkeltonItem = () => {
  return (
    <div className='SkeltonItem'>
      <Skeleton active avatar paragraph={{ rows: 1 }} />
    </div>
  )
}

export default SkeltonItem