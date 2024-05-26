import { ChangeEvent, useRef, useState } from "react"
import { json } from "stream/consumers"
import { fileURLToPath } from "url"

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
          // const data=pako.deflate(b64,{level:0})
          setSelectedPhoto({ url:URL.createObjectURL(file),buffer:b64,uploaded:undefined})
      
      };
      reader.readAsDataURL(file)
    }
    
    const upload=async()=>{
      console.log(selectedPhoto)
      if (selectedPhoto.uploaded)
        return {url:selectedPhoto.uploaded}
      console.log("fetching")
      if(selectedPhoto.buffer){
        const res=await fetch("/api/cloud/upload-image",{
          method:"POST",
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify({buffer:selectedPhoto.buffer})
        })
        const {e,url}=await res.json() as any
        console.log("RECIEVED ","url",url,"e",e);
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