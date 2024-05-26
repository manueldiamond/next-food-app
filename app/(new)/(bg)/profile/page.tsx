

import { auth } from '@/auth'
import { ProfileOptions } from '@/components'
import { sfetch } from '@/utils/serverFetch'
import { redirect } from 'next/navigation'
import React from 'react'



const page = async() => {
  const session = (await auth())
  if(!session?.user){
    redirect("/")
  }
  const data=await getUserData()
  
  return (
    <div className=' w-full '>
       <ProfileOptions data={data}/>
    </div>
  )
}

async function getUserData(){
  const session = (await auth())
  if(!session?.user?.id){
    redirect("/")
  }
  const res = await sfetch("/api/get-user-data?id="+session.user.id,{next:{revalidate:1},
})
  const {data,error} = await res.json()

  if (error){
    console.error(error)
  }
  return data
}


export default page