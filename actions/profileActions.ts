"use server"
import { ConnectionError, userDataType } from '@/libs/types';
import { getUserPassword, saveUserDataToDb, updatePassword } from '../utils/db';
import { changePasswordSchema, parseZodError, profileDetailsSchema } from '@/libs/zod';
import { ZodError, string } from 'zod';
import { quickUpload } from '@/libs/cloudinary';
import { revalidatePath, revalidateTag } from 'next/cache';
import { auth } from '@/auth';
import { hashPassword, isPasswordValid } from '@/utils/passworder';


export const saveUserData=async(data:userDataType)=>{
    try{
        console.log("saving")
        await profileDetailsSchema.parseAsync(data)
        console.log("schema: OK")

        await saveUserDataToDb(data)
        console.log("save to DB: OK")
        console.log("SAVED",data)
        revalidateTag("fetcher")
        // revalidatePath("/")
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

export const changePassword=async (userid:string,formData:FormData)=>{
    try{
       const {currentPassword,newPassword,confirmPassword}= await changePasswordSchema.parseAsync({
            currentPassword:formData.get('currentPassword') as string,
            newPassword:formData.get('newPassword') as string,
            confirmPassword:formData.get('confirmPassword') as string,
        })
        const actualCurrentPassHass=await getUserPassword(userid)
        if(! await isPasswordValid(currentPassword,actualCurrentPassHass))
         throw new Error("Wrong Password!")
        const newPassHash = await hashPassword(newPassword)
        await updatePassword(userid,newPassHash)
        return {message:"Success"}
    }catch(e){
        if(e instanceof ZodError){
            const err=parseZodError(e)
            return {error:err.message,errInputs:err.paths}
        }
        if (e instanceof ConnectionError)
            return {error:e.message}
        console.log("error",e)
        return {error:"An error occured Changing your password your details"}
    }
}