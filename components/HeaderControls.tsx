"use client"
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { usePathname ,useRouter} from 'next/navigation'

const HeaderControls = () => {
    const pathname=usePathname()
    const router = useRouter()
    const isOnProfilePage=pathname==="/profile"
    const back=()=>router.back()
  return (
    <div className={ (isOnProfilePage?" text-white ":" text-gray-1 " )+ 'py-5 container flex justify-between '}>
        <button onClick={back} className='rounded-full click-scale'>
            <Image src={"/icons/back.svg"}
            width={28}
            height={28}
            alt="back-icon"/>
        </button> 
    
    
        <Image className='' src={!isOnProfilePage?"/icons/search.svg":"/icons/gear.svg"}
            width={24}
            height={24}
            alt={!isOnProfilePage?"search-icon":"settings-gear-icon"}/>
    
    </div>
  )
}

export default HeaderControls