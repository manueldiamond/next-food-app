import { ProfileOptions } from '@/componenets'
import TextInput from '@/componenets/TextInput'
import Image from 'next/image'
import React from 'react'



const page = ({searchParams}:{searchParams:{editing?:boolean}}) => {
  const {editing}=searchParams
  return (
    <div className=' w-full '>
       <ProfileOptions editing={(editing===undefined)?false:editing}/>
    </div>
  )
}

/* Rectangle 84 */



export default page