"use client"
import React, { ChangeEvent, InputHTMLAttributes, LegacyRef, ReactHTMLElement, ReactNode, useEffect, useRef, useState } from 'react'
import TextInput from './TextInput'
import Image from 'next/image'
import Link from 'next/link'
import Avatar from './Avatar'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useAuthContext } from '@/libs/context/authContext'
import { signOut, useSession } from 'next-auth/react'
import { logout } from '@/actions/loginActions'
import { userDataType } from '@/libs/types'
import { User } from 'next-auth'
import Form, { useForm } from './Form'
import { formInput } from '../libs/types';
import { saveUserData, uploadImg } from '@/actions/profileActions'
import { string } from 'zod';
import { File } from 'buffer'
import { useImageUpload } from '@/libs/ImageUpload'
import { setEngine } from 'crypto'
import { error } from 'console';


// will use later
// type profileDetailsInputFieldsType=
//     "Name"|
//     "Email"|
//     "Delivery address"|
//     "Password"


const profileDetails=[
    {
      label:"Full name",
      name:"name",
      type:"text"
    },
    {
      name:"email",
      type:"email"
    },
    {
      label:"Delivery address",
      name:"deliveryaddress",
      type:"text"
    },
  
  ]

const links=[
    {title:"Payment Details",path:"/payment-details"},
    {title:"Order History",path:"/order-history"},
    {title:"Change Passwod",path:"/change-history"}
]

const DetailsForm=({inputfields,editing,edit,saveAction}:any)=>{
  const {setErrorMsg,setErrored,controls} = useForm()
  return(
    <Form 
      gap={1}
      heading={editing&&"Edit Profile"}
      className='!py-0 !my-0 flex flex-col'
      submitAction={(formData)=>saveAction(formData,setErrorMsg,setErrored)} 
      inputsArray={inputfields} 
      {...controls} 
    >
      <div className='container'>
        
        <div className=' text-[#808080] flex flex-col gap-2'>
          <hr className='mx-5 text-[#E8E8E8]'/>
          {links.map(link=>(
          <Link key={link.path} href={"profile/"+link.path} className=' py-2 hover:text-black flex items-center justify-between group hover:bg-gray-50 rounded-xl px-5'>
              <span>{link.title}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:translate-x-2 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
          </Link>
          ))}
        </div>
        <div className='container max-w-[550px] centered gap-8 text-lg py-8 font-medium'>
          <button 
            type={editing?'submit':'button'} 
            onClick={()=>!editing&&edit()} 
            className={`group dark-button !p-6`}
          >
              <span className=''>{editing?"Save Changes":"Edit Profile"}</span>
              <Image    
                width={24} 
                height={24} 
                alt="edit icon"
                src={"/icons/edit.svg"} 
                className='group-hover:scale-110 transition-transform  group-hover:-translate-y-1' 
              />
          </button>
          <button 
            onClick={async()=>await logout()} 
            className='group hollow-accent-button !p-6'
          >
              <span className=''>Log Out</span>
              <Image className='group-hover:translate-x-1 transition-transform' src={"/icons/sign-out.svg"} width={24} height={24} alt="edit icon"/>
          </button>
        </div>
      </div>
    </Form>
  )
}

const ProfileOptions = ({user,data}:{data:Record<string,string>,user:User}) => {
  const router=useRouter()
  const params=useSearchParams()
  const editing=params.get("editing")
  const {changePhoto,getPublicUrl:getImagePublicUrl,selectedPhoto,FileInputHelper}=useImageUpload()
  const editedUser={...user,image:selectedPhoto.url?selectedPhoto.url:user.image} as  User
  console.log(editedUser)
  
  const inputfields=data&&profileDetails.map(field=>({
    ...field,
    disabled:(field.name==="email")?true:!editing,
    defaultValue:Object.keys(data).includes(field.name)?data[field.name]:undefined,
  }))

  const edit=(enabled=true)=>{
    router.push("/profile?editing="+enabled)
  }

  const saveChanges=async (formData:FormData,setErrorMsg:(m:string)=>void,setErrored:(e:string[])=>void)=>{
    let imageUrl:string|undefined=undefined
    const imgresult= await getImagePublicUrl()
    if(imgresult){
      const {error,url}=imgresult
      if(error)
        return setErrorMsg(error)
      else{
        imageUrl=url
      }
    }
    const {error:saveError,errInputs} = await saveUserData({ 
      id:user.id!,
      email:formData.get('email') as string,
      name:formData.get('name') as string,
      profileImage:imageUrl?imageUrl:user.image
    })
    if (errInputs){
      setErrored(errInputs)
    }
    if(saveError)
      setErrorMsg(saveError)
    else{
      edit(false)
    }
  }

  

 
  
  return (
    <div className='w-full relative'>
        <Avatar 
          size={151} onClick={editing?changePhoto:undefined}
          className={`${editing&&"click-scale border-4 !border-white"} !border-t-4 top-0 mx-auto !bg-accent-gradient -translate-y-1/2 profile !rounded-[30px] !w-[30%] !min-w-[151px] aspect-square !p-0`} 
          user={editing?editedUser:user}
        >
          <FileInputHelper/>
         {editing&&
         <div className='absolute border-white border-4 translate-x-1 translate-y-1 text-white bg-black/30 p-2 aspect-square w-min right-0 bottom-0 rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
          </div>
          } 
        </Avatar>
      
       <DetailsForm 
          inputfields={inputfields}
          editing={editing}
          edit={edit}
          saveAction={saveChanges}
        />
    </div>
  )
}

export default ProfileOptions