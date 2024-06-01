import Link from 'next/link'
import React, { use } from 'react'
import Avatar from './Avatar'
import { useAuthContext } from '../libs/context/authContext';
import TextLogo from './TextLogo';
import { auth } from '@/auth';

const Header = async() => {
  
  const session = await auth()
  console.log(session?.user)
  return (
    <div className='container items-center  flex justify-between mt-1'>
       <TextLogo />
       <div className='flex gap-2 '>
        <span className='hidden sm:block text-2xl m-auto text-gray-3 font-bold '>{session?.user?.name}</span>
        <Link href={"/profile"} className=''>
            <Avatar className='w-[40px]  !md:w-[60px]' size={60} user={session?.user}/>
        </Link>
       </div>
    
    </div>
  )
}

export default Header