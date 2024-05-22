"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import ham1 from '@/imgs/splash-ham-tall.png'
import ham2 from '@/imgs/splash-ham.png'

const Splash = ({timed=false}) => {
  return (
    <div className={`transition duration-300 fade fixed top-0 left-0 centered w-screen h-screen bg-accent-gradient`}>
        <div className={'animate-pulse duration-500 logo absolute font-lobster'}>
            <div className=' text-white font-[400] text-[40px]'>Tasty</div>
            <div className='mt-[-20px] ml-[70px] text-[#3C2F2F] font-[400] text-[40px]'>chef</div>
        </div>
        <div  className='food-slide-in flex bottom-0 absolute items-end left-0'>
          <Image src={ham1}
              className="object-contain"
              alt='a tall hamburger'
          />
          <Image src={ham2}
              className=" -ml-20 drop-shadow-[0_35px_15px_rgba(0,0,0)] shadow-black bottom-0 object-contain"
              alt='a tall hamburger'
          />
        </div>
    </div>
  )
}

export default Splash