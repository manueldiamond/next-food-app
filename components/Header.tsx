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
    <div className='container items-center  flex justify-between mt-6'>
       <TextLogo />
        <Link href={"/profile"}>
            <Avatar user={session?.user}/>
        </Link>
    
    </div>
  )
}

export default Header