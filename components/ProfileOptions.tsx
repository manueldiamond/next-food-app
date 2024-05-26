"use client"
import React, { ChangeEvent, InputHTMLAttributes, LegacyRef, ReactHTMLElement, ReactNode, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Avatar from './Avatar'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { logout } from '@/actions/loginActions'
import { User } from 'next-auth'
import Form, { useForm } from './Form'
import { saveUserData, } from '@/actions/profileActions'
import { useImageUpload } from '@/libs/ImageUpload'
import { useFormStatus } from 'react-dom'
import loading from '../app/loading';
import { Spinner } from '.'
import { useSession } from 'next-auth/react'


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
const FormButton=({editing,edit}:{editing:boolean,edit:()=>void})=>{
  const {pending}= useFormStatus()
  return(

    <button 
    type={editing?'submit':'button'} 
    onClick={()=>!editing&&edit()} 
    disabled={pending}
    className={`group dark-button !p-6 ${pending&&" no-scale animate-pulse"}`}
    >
        <span className={""}>{editing?(pending?"Saving":"Save Changes"):"Edit Profile"}</span>
        {pending?
        <Spinner/>
        :
        <Image    
          width={24} 
          height={24} 
          alt="edit icon"
          src={"/icons/edit.svg"} 
          className='group-hover:scale-110 transition-transform  group-hover:-translate-y-1' 
        />}
    </button>
  )

}
const DetailsForm=({inputfields,editing,edit,saveAction}:any)=>{
  const {setErrorMsg,setErrored,controls} = useForm()
  const action=async(formData:FormData)=>{
    await saveAction(formData,setErrorMsg,setErrored)
  }
  return(
    <Form 
      gap={1}
      heading={editing&&"Edit Profile"}
      className='!py-0 !my-0 flex flex-col'
      submitAction={action} 
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
          <FormButton edit={edit} editing={editing} />
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


const ProfileOptions = ({data}:{data:Record<string,string>}) => {
  const {update,data:session}=useSession()
  const user = session?.user
  const router=useRouter()
  const params=useSearchParams()
  const editing=params.get("editing")
  const [loadingImage,setLoadingImage]=useState(false)
  const {changePhoto,getPublicUrl:getImagePublicUrl,selectedPhoto,FileInputHelper}=useImageUpload()
  const editedUser={...user,image:selectedPhoto.url?selectedPhoto.url:user?.image} as  User
  console.log(data)
  const inputfields=data&&profileDetails.map(field=>({
    ...field,
    disabled:(field.name==="email")?true:!editing,
    defaultValue:Object.keys(data).includes(field.name)?data[field.name]:undefined,
  }))

  const edit=(enabled=true)=>{
    router.replace("/profile?editing="+enabled)
  }

  const saveChanges=async (formData:FormData,setErrorMsg:(m:string)=>void,setErrored:(e:string[])=>void)=>{
    let imageUrl:string|undefined=undefined
    setLoadingImage(true)
    const imgresult= await getImagePublicUrl()
    setLoadingImage(false)
    if(imgresult){
      const {error,url}=imgresult
      if(error)
        return setErrorMsg(error)
      else  imageUrl=url
      
   }
    const data={ 
      id:user?.id!,
      email:formData.get('email') as string,
      name:formData.get('name') as string,
      deliveryaddress:formData.get('deliveryaddress') as string,
      profileimage:imageUrl?imageUrl:user?.image,
    }
    console.log("SAVE2",data)
    const {error:saveError,errInputs} = await saveUserData(data)
    console.log("ERR:",saveError)

    if (errInputs){
      setErrored(errInputs)
    }
    if(saveError)
      setErrorMsg(saveError)
    else{
      console.log("Rerouting")
      console.log(" SESSION ING")
      const newSesh={...session,user:{...data,image:data.profileimage}}
      console.log("newSesh",newSesh)
      update(newSesh)
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
          <>
          <div className='absolute border-white border-4 translate-x-1 translate-y-1 text-white bg-black/30 p-2 aspect-square w-min right-0 bottom-0 rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
            </div>
          {loadingImage&&<div className='absolute w-full h-full left-0 top-0'>
            <Spinner/>
          </div>}
          </>
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