import React from 'react'
import Top from '../Top'
import TopResultDisplay from '../TopResultDisplay'
import RevenueByDeviceAndTraffic from '../RevenueByDeviceAndTraffic'
import LatestOrder from '../LatestOrder'

export default function DemoComponent() {
  return (
    <div>
      <Top/>
      <TopResultDisplay/>
      <RevenueByDeviceAndTraffic/>
      <LatestOrder/>
    </div>
  )
}
