import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react"
import { json } from "stream/consumers"
import { fileURLToPath } from "url"
import { useObjectState } from "./Hooks"
import loading from '../app/loading';

export const useImageUpload=(deps:any[]=[])=>useCallback(()=>{
    const pictureInput=useRef<HTMLInputElement|null>(null)
    const [selectedPhoto,setSelectedPhoto]=useObjectState<{url:string|null,buffer:any,uploaded?:string|undefined,loading:boolean}>({url:null,buffer:null,loading:false})
    const setLoading=(loading:boolean)=>setSelectedPhoto({loading})
    
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
      if (selectedPhoto.uploaded)
        return {url:selectedPhoto.uploaded}
      setLoading(true)
      console.log("starting post",selectedPhoto)
      if(selectedPhoto.buffer){
        console.log("posting")
        const res=await fetch("/api/cloud/upload-image",{
          method:"POST",
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify({buffer:selectedPhoto.buffer})
        })
        const {e,url}=await res.json() as any
        console.log("RECIEVED ","url",url,"e",e);
        if(e){

          setLoading(false)
          return {error:"Error, unable to upload photo"}
        }
        setSelectedPhoto({uploaded:url,loading:false})

        return {url}
      }
      
    }
    
    const FileInputHelper=useCallback(()=>(
      <input ref={pictureInput} hidden accept="image/*" onChange={pictureChanged} type='file'className='hidden invisible'/>
    ),[pictureInput,pictureChanged])
    return {FileInputHelper,loading:selectedPhoto.loading,getPublicUrl:upload,selectedPhoto,changePhoto}
  },deps)