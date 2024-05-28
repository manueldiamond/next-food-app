"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import ham1 from '@/imgs/splash-ham-tall.png'
import ham2 from '@/imgs/splash-ham.png'
import TextLogo from './TextLogo'

const Splash = ({timed=false}) => {
  return (
    <div className={`transition duration-300 fade fixed top-0 left-0 centered w-screen h-screen bg-accent-gradient`}>
        <div className='animate-pulse duration-500 ab'>
          <TextLogo fancy/>
        </div>
        <div  className='select-none pointer-events-none food-slide-in flex bottom-0 absolute items-end left-0'>
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