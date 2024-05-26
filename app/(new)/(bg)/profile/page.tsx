

import { auth } from '@/auth'
import { ProfileOptions } from '@/components'
import { getUserDataById } from '@/utils/db'
import { redirect } from 'next/navigation'
import React from 'react'



const page = async() => {
  const session = (await auth())
  if(!session?.user){
    redirect("/login")
  }
  return (
    <div className=' w-full '>
       <ProfileOptions/>
    </div>
  )
}

export default page