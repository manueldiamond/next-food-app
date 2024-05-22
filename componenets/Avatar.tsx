import Image from 'next/image'
import React, { useActionState } from 'react'
import { useAuthContext, userType } from '../libs/context/authContext';

const Avatar = ({size=60,className="",user}:{size?:number,className?:string, user:userType|undefined}) => {
  let imgURL:string|undefined|null="/icons/profile.svg"
  let initials=""
  if (user){
    imgURL=user.profileImage
    if(!imgURL) initials=`${user?.name[0]}${user!.name[user!.name.indexOf(" ")+1]}`
  }
  return (
    <div className={`${className} centered bg-gray-3/10 overflow-hidden profile aspect-square w-[60px] rounded-full`}>
        {imgURL?<Image
            className='w-full h-full object-contain' 
            src={imgURL}
            width={size}
            height={size}
            alt='profile-photo'
        />:<span style={{fontSize: size/2.0+"px"}} className=' text-white text-center w-full mx-0 my-0  uppercase font-bold'>
            {initials}
        </span>}
    </div>
  )
}

export default Avatar