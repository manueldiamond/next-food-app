"use server"
import { ConnectionError, userDataType } from '@/libs/types';
import { saveUserDataToDb } from '../utils/db';
import { parseZodError, profileDetailsSchema } from '@/libs/zod';
import { ZodError, string } from 'zod';
import { quickUpload } from '@/libs/cloudinary';
import { blob } from 'stream/consumers';
import { sfetch } from '@/utils/serverFetch';
import { strict } from 'assert';
import { auth, update } from '@/auth';
import { User } from 'next-auth';


export const saveUserData=async(data:userDataType)=>{
    try{
        await profileDetailsSchema.parseAsync(data)
        await saveUserData(data)
        const session=await auth()
        console.log("USER SESSION FROM SAVEDATA",session)
        if (session)
            await update({user:{...session.user,name:data.name,image:data.profileImage}})
    }catch(e){
        if(e instanceof ZodError){
            const err=parseZodError(e)
            return {error:err.message,errInputs:err.paths}
        }
        if (e instanceof ConnectionError)
            return {error:e.message}
    }
    return {error:"An error occured while saving your details"}
}

export const uploadImg=async(dataURI:string)=>{
    const {result,error} = await quickUpload(dataURI)

    return {url:result?.url,error}

}