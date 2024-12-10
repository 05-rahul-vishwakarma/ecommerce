import DemoComponent from '@/components/Dashboard/Demo/DemoComponent'
import Top from '@/components/Dashboard/Top'
import TopResultDisplay from '@/components/Dashboard/TopResultDisplay'
import React from 'react'


export default function Dashboard() {
  return (
    <div>
      {/* <DemoComponent />
       */}
       <Top/>
       <TopResultDisplay/>
    </div>
  )
}
