import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import MenuFour from '@/components/Header/MenuFour'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import React from 'react'

export default function ClientContact() {
  return (
    <div>
      <TopNavOne props="style-one bg-white" slogan="New customers save 10% with the code GET10" />
      <div id="header" className='relative w-full text-purple'>
        <MenuFour props="bg-transparent" />
        <Breadcrumb heading='Client Contact' subHeading='Contact Client' />
      </div>
      <div className='contact-us md:py-20 py-10  bg-[#f6efff]'>
        <div className="container">
          <div className="flex justify-between max-lg:flex-col gap-y-10">
            <h1>Address:- Shop No-105 1st Floor Aggarwal Tower Pocket O & P Dilshad Garden
              Near in font of Punjab National Bank  Delhi 110095 </h1>
          </div>
          <div>
            <h2>Contact No. 9821472627</h2>
            <h3>Email:- salestheribbonpack@gmail.com</h3>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
