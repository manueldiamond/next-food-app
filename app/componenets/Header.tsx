import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {

    const profilePhotoURL="/vercel.svg"
  return (
    <div className='container items-center  flex justify-between mt-6'>
        <div className='logo font-lobster text-[45px]'>
            <span className='text-accent'>tasty</span>
            <span>chef</span>
        </div>
        <div className='flex bg-accent overflow-hidden profile aspect-square w-[60px] rounded-full'>
            <Link href={"/profile"}>
            <Image
                className='object-contain' 
                src={profilePhotoURL}
                width={500}
                height={500}
                alt='profile-photo'
            />
            </Link>
        </div>
    </div>
  )
}

export default Header