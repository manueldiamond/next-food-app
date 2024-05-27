import Image from 'next/image'
import React, { ReactNode, useActionState } from 'react'
import { useAuthContext,  } from '../libs/context/authContext';
import { userType } from '@/libs/types';
import { User } from 'next-auth';

type avatarProps={
  onClick?:()=>any,
  size?:number,
  className?:string, 
  user:User|undefined,
  children?:ReactNode
}
const Avatar = ({size=60,onClick,className="",user,children}:avatarProps) => {
  let imgURL:string|undefined|null="/icons/profile.svg"
  let initials=""
  if (user){
    imgURL=user.image
    if(!imgURL && user.name){
      const first=user?.name[0]
      const second=user.name.includes(" ")&&user!.name[user!.name.indexOf(" ")+1]
      initials=`${first}${second?second:""}}`
    }
  }
  return (
    <div onClick={onClick} className={`select-none border-white ${className} transition-colors ${initials?" select-none bg-accent/50 hover:bg-accent":" bg-gray-3/10 hover:bg-gray-3/70"} centered overflow-clip profile aspect-square w-[60px] rounded-full`}>
        {imgURL?<Image
            className='w-full h-full object-cover' 
            src={imgURL}
            width={size}
            height={size}
            alt='profile-photo'
        />:<span style={{fontSize: size/2.0+"px"}} className=' cursor-none pointer-events-none text-white text-center w-full mx-0 my-0  uppercase font-bold'>
            {initials}
        </span>}
        {children}
    </div>
  )
}

export default Avatar