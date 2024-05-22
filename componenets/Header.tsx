"use client"
import Link from 'next/link'
import React from 'react'
import Avatar from './Avatar'
import { useAuthContext } from '../libs/context/authContext';
import TextLogo from './TextLogo';

const Header = () => {
  
  const {user} = useAuthContext()
    
  return (
    <div className='container items-center  flex justify-between mt-6'>
       <TextLogo />
        <Link href={user?"/profile":"/login"}>
            <Avatar user={user}/>
        </Link>
    
    </div>
  )
}

export default Header