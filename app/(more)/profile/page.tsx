import { ProfileOptions } from '@/app/componenets'
import TextInput from '@/app/componenets/TextInput'
import Image from 'next/image'
import React from 'react'



const page = ({searchParams}:{searchParams:{editing?:boolean}}) => {
  const {editing}=searchParams
  return (
    <div className=' w-full '>
      <div className=' fixed w-screen h-screen top-0 left-0 -z-10 bg-accent-gradient '>
        <Image
          className='absolute left-0 -top-4 mix-blend-overlay opacity-50'
          src={"/more-ham.png"}
          width={196}
          height={196}
          alt='ham'
        />
        <Image
          className='absolute right-[-96px] top-[25px] mix-blend-overlay opacity-50'
          src={"/more-ham.png"}
          width={196}
          height={196}
          alt='ham'
        />
      </div>
      <div className=' -ml-2 mb-2 w-full bg-white rounded-[35px] mt-[146px] relative centered flex-col'>
       <ProfileOptions editing={(editing===undefined)?false:editing}/>
      </div>
    </div>
  )
}

/* Rectangle 84 */



export default page