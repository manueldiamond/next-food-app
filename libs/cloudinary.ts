"use server"
import cloudinary from 'cloudinary';
import { error } from 'console';

const cloud=cloudinary.v2
cloud.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  
export async function  quickUpload(file:string){
  const res:{error?:string,result?:cloudinary.UploadApiResponse}={}
    cloud.uploader.upload(file)
    .then(result=>res.result=result)
    .catch(e=>res.error=e)
  return res
}

