"use client"
import TextInput from '@/components/TextInput'
import React, { FormEvent, FormEventHandler, useState } from 'react'

const page = ({searchParams}:{searchParams:{
    reponse?:string
}}) => {
    const [msg,setMsg] = useState("")
    
    const postRequest=async(event:FormEvent<HTMLFormElement>)=>{
        setMsg("")
        event.preventDefault()
        const formData=new FormData(event.currentTarget)
        const query=formData.get("query") as string
        if (!query)
            return
        
        const res = await fetch(`/api/db/setup`,{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });
        const result= await res.json()
        
        setMsg(JSON.stringify(result))
    
    }
    return (
    <div className='py-20'>
        <form onSubmit={postRequest} className='flex flex-col gap-2'>
            <TextInput label='Query' required name='query'/>
            
            <button>Send</button>
        </form>
        <p className='max-w-[500px] mx-auto'>{msg}</p>
    </div>
  )
}

export default page