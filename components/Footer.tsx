"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useAuthContext } from '../libs/context/authContext'
import { useSession } from 'next-auth/react'
import { link } from 'fs'

const footerLinks=[
    {
      name:"home",
      link:"/",
      icon:"/icons/home.svg"
    },  
    {
        name:"logs",
        link:"/logs",
        icon:"/icons/message.svg"
      },  {
        name:"favourites",
        link:"/favourites",
        icon:"/icons/heart.svg"
      },
      
      {
      name:"profile",
      link:"/profile",
      icon:"/icons/profile.svg"
      },
  ]

const Footer = () => {
  const currentPath=usePathname() as string
  const isCurrentPath=(path:string)=>currentPath===path||(currentPath.includes(path)&&path.length>1)
  return (
    <>
    {
      (<><footer className=' z-50 fixed bottom-0 left-0 min-w-full h-[75px] centered'>
        <div className='bg absolute centered h-full w-[200px] '>
          <div className='w-full h-full object-cover centered'>
            <svg className='absolute h-full' width="430" height="76" viewBox="0 0 430 76" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M179.588 20.677L161.5 21L144.5 0H-19V90H437V0H285.5L273.5 19L251.129 19.3995C244.21 32.2588 230.626 41 215 41C199.897 41 186.702 32.8343 179.588 20.677Z" fill="#EF2A39"/>
            <circle cx="144" cy="41" r="41" fill="#EF2A39"/>
            <circle cx="286" cy="41" r="41" fill="#EF2A39"/>
            </svg>

          </div>
          {/* <Image src="/fotter-cusp.svg"
          width={456}
          height={90}
          alt='bottom-svb'
          className='w-full h-full object-cover'/> */}
          <div className='h-full w-screen absolute bg-accent right-full'/>
          <div className='h-full w-screen absolute bg-accent left-full'/>
        </div>
        <Link href={false?"#":"/products/edit/new"} className='click-scale button  text-white !absolute rounded-full centered shadow-xl shadow-black/30 top-0 -translate-y-[60%] bg-accent h-[72px] w-[72px]'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="w-6 h-6 pointer-events-none select-none">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </Link>
        <ul className='z-10 !mx-0 justify-between flex w-full flex-1 px-10 py-3'>
            {footerLinks.map((item,index)=>{
              const current=isCurrentPath(item.link)
              return(
                <>{(index===Math.floor(footerLinks.length/2))&&<span className='mx-5'/>}
                  <li key={item.link}>
                    <Link href={item.link} className={' click-scale rounded-full flex flex-col gap-1 items-center '+(!current&&"hover:opacity-100 opacity-70 ")}>
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
                </li>
              </>
            )})}
        </ul>
    </footer>
    <div className='min-h-[100px] w-full'/>
    </>)
  }
  </>
  )
}

export default Footer