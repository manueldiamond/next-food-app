import { uploadImg } from "@/actions/profileActions"
import { ChangeEvent, useRef, useState } from "react"
import { json } from "stream/consumers"
import { fileURLToPath } from "url"
import pako from 'pako';

export const useImageUpload=()=>{
    const pictureInput=useRef<HTMLInputElement|null>(null)
    const [selectedPhoto,setSelectedPhoto]=useState<{url:string|null,buffer:any,uploaded?:string|undefined}>({url:null,buffer:null})
    const changePhoto=()=>{
      // console.log("CLICKE")
      if(pictureInput.current){
        pictureInput.current.click()
      }
    }
    const pictureChanged=async(event:ChangeEvent<HTMLInputElement>)=>{
      if (selectedPhoto.url)
        URL.revokeObjectURL(selectedPhoto.url)
      const file=event.target.files?.item(0)
      if(!file) 
        return
      const reader = new FileReader();
      reader.onload = async(e) => {
          const b64 = e.target!.result as string;
          const data=pako.deflate(b64,{level:0})
      setSelectedPhoto({ url:URL.createObjectURL(file),buffer:data,uploaded:undefined})
      
      };
      reader.readAsDataURL(file)


    }
    

    const upload=async()=>{
      if (selectedPhoto.uploaded)
        return {url:selectedPhoto.uploaded}
      if(selectedPhoto.buffer){
        const res=await fetch("/api/cloud/upload-image",{
          method:"POST",
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify({buffer:selectedPhoto.buffer})
        })
        const {e,url}=res.json() as any
        if(e){
          return {error:"Error, unable to upload photo"}
        }
        setSelectedPhoto(prev=>({...prev,uploaded:url}))
        return {url}
      }
      
    }
    
    const FileInputHelper=()=>(
      <input ref={pictureInput} hidden accept="image/*" onChange={pictureChanged} type='file'className='hidden invisible'/>
    )
    return {FileInputHelper,getPublicUrl:upload,selectedPhoto,changePhoto}
  }