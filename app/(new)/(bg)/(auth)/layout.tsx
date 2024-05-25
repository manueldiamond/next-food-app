import { auth } from '@/auth'
import {SignInWIthGoogleButton} from '@/components'
import TextLogo from '@/components/TextLogo'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const layout = async({children}:{children:ReactNode}) => {
    const session = await auth()
    console.log(session)
    if (session?.user?.id){
        redirect("/")
    }
  return (
    <div className='pb-20 w-full min-h-full centered flex-col relative'>
        <div className=' bg-accent-gradient mx-auto border-4 absolute top-0 translate-y-[-60%] border-white rounded-full aspect-square centered p-8 w-min my-5'>  
            <TextLogo fancy/>
        </div>
        {children}
        <div className='flex w-full container flex-col gap-2'>
            <div className='px-10 mb-2 text-gray-400 w-full container centered relative'>
                <hr className=' w-full'/> 
                <span className='p-2 absolute w-min bg-white'>Or</span>
            </div>
           <SignInWIthGoogleButton/>
        </div>   

    </div>
  )
}

export default layout