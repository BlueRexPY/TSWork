import React from 'react'
import SkeltonItem from './SkeltonItem'

const SkeletonVacaniesList = () => {
  return (
    <div className="vacancyList">
        <SkeltonItem/>
        <SkeltonItem/>
        <SkeltonItem/>
        <SkeltonItem/>
        <SkeltonItem/>
        <SkeltonItem/>        
    </div>
  )
}

export default SkeletonVacaniesList