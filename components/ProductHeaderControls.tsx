"use client"
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const ProductHeaderControls = () => {
    const pathname=usePathname()
    const isOnProfilePage=pathname==="/profile"
  return (
    <div className={ (isOnProfilePage?" text-white ":" text-gray-1 " )+ 'py-5 container flex justify-between '}>
        <Link href={"/"} className='rounded-full click-scale'>
            <Image src={"/icons/back.svg"}
            width={28}
            height={28}
            alt="back-icon"/>
        </Link> 
    
    
        <Image className='' src={!isOnProfilePage?"/icons/search.svg":"/icons/gear.svg"}
            width={24}
            height={24}
            alt={!isOnProfilePage?"search-icon":"settings-gear-icon"}/>
    
    </div>
  )
}

export default ProductHeaderControls