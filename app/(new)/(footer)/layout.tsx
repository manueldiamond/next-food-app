import { auth } from '@/auth'
import { Footer } from '@/components'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const layout = async ({children}:{children:ReactNode}) => {
    const session = await auth()
    if(!session?.user?.id){
        redirect('/login')
        return (<div/>)
    }
  return (
    <div className='container'>
        {children}
        <Footer/>
    </div>
  )
}

export default layout