"use server"
import { ConnectionError, userDataType } from '@/libs/types';
import { saveUserDataToDb } from '../utils/db';
import { parseZodError, profileDetailsSchema } from '@/libs/zod';
import { ZodError, string } from 'zod';
import { quickUpload } from '@/libs/cloudinary';


export const saveUserData=async(data:userDataType)=>{
    try{
        console.log("saving")
        await profileDetailsSchema.parseAsync(data)
        console.log("schema: OK")

        await saveUserDataToDb(data)
        console.log("save to DB: OK")
        console.log("SAVED",data)
        return {};
        // const session=await auth()
        // if (!session)
        //  throw new Error()
        // const newSesh:Session={...session,user:{...session.user,name:data.name,image:data.profileimage}}
        // console.log("NEW SESSION FROM SAVEDATA",newSesh)
        // if (session)
        //     await update(newSesh)
    }catch(e){
        if(e instanceof ZodError){
            const err=parseZodError(e)
            return {error:err.message,errInputs:err.paths}
        }
        if (e instanceof ConnectionError)
            return {error:e.message}
        console.log("error",e)
        return {error:"An error occured while saving your details"}
    }
}

const uploadImg=async(dataURI:string)=>{
    const {result,error} = await quickUpload(dataURI)
    return {url:result?.url,error}

}