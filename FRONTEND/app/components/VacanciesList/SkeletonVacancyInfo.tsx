import { Skeleton } from 'antd'
import React from 'react'

const SkeletonVacancyInfo = () => {
  return (
    <div className='vacancyPage'>
      <div className='vacancyInfo'>
        <div className='header'>
            <div className='headerInfo'>
            <Skeleton active />
            </div>
        </div>
        <main>
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        </main>
      </div>
    </div>
  )
}

export default SkeletonVacancyInfo