"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const footerLinks=[
    {
      name:"home",
      link:"/",
      icon:"icons/home.svg"
    },  {
    name:"profile",
    link:"/profile",
    icon:"icons/profile.svg"
    },
    {
    name:"message",
    link:"/messages",
    icon:"icons/message.svg"
    },  {
    name:"favourites",
    link:"/favourites",
    icon:"icons/heart.svg"
    },

]

const Footer = () => {
  const currentPath=usePathname() as string
  const isCurrentPath=(path:string)=>currentPath===path||(currentPath.includes(path)&&path.length>1)
  return (
    <footer className=' z-50 fixed bottom-0 left-0 w-screen h-[70px] centered'>
        <div className='bg absolute centered h-full w-[200px] '>
          <Image src="/fotter-cusp.svg"
          width={456}
          height={90}
          alt='bottom-svb'
          className='w-full h-full object-cover'/>
          <div className='h-full w-screen absolute bg-accent right-full'/>
          <div className='h-full w-screen absolute bg-accent left-full'/>
        </div>
        <button className='clicky text-white absolute rounded-full centered shadow-xl shadow-black/30 top-0 -translate-y-[70%] bg-accent h-[72px] w-[72px]'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
        <div className='z-10 justify-between flex flex-1 px-10 py-3'>
            {footerLinks.map((item,index)=>{
              const current=isCurrentPath(item.link)
              return(
                <>
                  {index===footerLinks.length/2&&<div/>}
                  <Link href={item.link} className='flex flex-col gap-1 items-center'>
                    <Image src={item.icon}
                      width = {24}
                      height = {24}
                      alt = {`${item.name} icon`}
                    />
                  {current&&<div className='dot'>
                      <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="2" cy="2" r="2" fill="white"/>
                      </svg>
                    </div>}
                  </Link>
              </>
            )})}
        </div>
    </footer>
  )
}

export default Footer