import TextInput from '@/componenets/TextInput'
import { redirect } from 'next/navigation'
import React from 'react'

const page = ({searchParams}:{searchParams:{
    reponse?:string
}}) => {
    const msg=searchParams.reponse
    const postRequest=async(formData:FormData)=>{
        "use server"
        const query=formData.get("query")
        if (!query) return
        const response = await fetch('/app/api/db/setup/',{
            method:"POST",
            body:JSON.stringify({query}),        
        })
        const msg=await response.json()

        redirect("/db?response="+JSON.stringify(msg))
    }
    return (
    <div>
        <form action={postRequest} className='flex flex-col gap-2'>
            <TextInput label='Query' required name='query'/>
            
            <button>Send</button>
        </form>
        <p>{msg}</p>
    </div>
  )
}

export default page