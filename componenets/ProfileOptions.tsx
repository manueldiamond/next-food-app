"use client"
import React, { useState } from 'react'
import TextInput from './TextInput'
import Image from 'next/image'
import Link from 'next/link'
import { useAuthContext } from '../libs/context/authContext'
import Avatar from './Avatar'
import { useRouter } from 'next/navigation'


// will use later
// type profileDetailsInputFieldsType=
//     "Name"|
//     "Email"|
//     "Delivery address"|
//     "Password"


const profileDetails=[
    {
      name:"Name",
      type:"text"
    },
    {
      name:"Email",
      type:"email"
    },
    {
      name:"Delivery address",
      type:"text"
    },
    {
      name:"Password",
      type:"password"
    }
  
  ]

const links=[
    {title:"Payment Details",path:"/payment-details"},
    {title:"Order-History",path:"/order-history"}
]
const ProfileOptions = ({editing}:{editing:boolean}) => {
  const {user} = useAuthContext()
  const router=useRouter()
//   TODO user fetch data
  const data:Record<string,string>={
    "Name":"Mohammed Tabi Malik",
    "Email":"tabimalik@gmail.com",
    "Delivery address":"Aflao P.O Box 2305 tema accra",
    "Password":"password"
  }


  const logout=()=>{

  }
  
  const saveChanges=()=>{

  }
   
  const edit=()=>{
    router.push("/profile?editing=true")
  }
  return (
    <form className='w-full relative'>
         
        <Avatar size={151} className='top-0 mx-auto !bg-gray-100 -translate-y-1/2 profile !rounded-[30px] !w-[30%] !min-w-[151px] aspect-square' user={user}/>
        <div className='container'>
          <div className='flex flex-col gap-3'>
          {profileDetails.map(input=>{
            const defaultValue=data[input.name]
            return(
            <TextInput defaultValue={defaultValue} label={input.name} {...input} disabled={!editing}/>)
          })}
          </div>
          <div className='px-5 text-[#808080] flex flex-col gap-2'>
            <hr className='text-[#E8E8E8]'/>
            {links.map(link=>(
             <Link  href={link.title} className=' py-2 hover:text-gray-2 flex items-center justify-between'>
                 <span>{link.title}</span>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
             </Link>
            ))}
          </div>
          <div className='container max-w-[550px] centered gap-8 text-lg py-8 font-medium'>
            <button type={editing?'submit':'button'} onClick={editing?saveChanges:edit} className={` w-full  p-6 click-scale rounded-20 centered gap-5 bg-gray-1 text-white`}>
                <span className=''>{editing?"Save Changes":"Edit Profile"}</span>
                <Image src={"/icons/edit.svg"} width={24} height={24} alt="edit icon"/>
            </button>
            <button onClick={logout} className='w-full p-6 click-scale rounded-20 border-solid border-[3px] text-accent centered gap-5 bg-transparent border-accent '>
                <span className=''>Log Out</span>
                <Image src={"/icons/sign-out.svg"} width={24} height={24} alt="edit icon"/>
            </button>
          </div>
        </div>
    </form>
  )
}

export default ProfileOptions