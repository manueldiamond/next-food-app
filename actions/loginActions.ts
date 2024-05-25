"use server"

import { signIn, signOut } from "@/auth";
import { ConnectionError, CustomError, LoginError } from "@/libs/types";
import { parseZodError, registerSchema } from "@/libs/zod";
import { addUserToDb, getUserFromDb, isUserInDB } from "@/utils/db";
import { hashPassword } from "@/utils/passworder";
import { error, time } from "console";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { setTimeout } from "timers/promises";
import { ZodError, object } from "zod";




type authResponseType={
    ok:boolean;
    message?:string;
    errInputs?:string[]
    redirect?:boolean;
}


export const googleSignIn=async()=>{
    await signIn("google")
    
}


export const tryLoginEmail=async(email:string,password:string,callbackUrl?:string)=>{
    const result:authResponseType={
        ok:false,
    }
    try{
        const signinresp = await signIn("credentials",{redirect:false, email,password},)
        result.ok=true
    }catch(e){
        console.error("i caught this ERROR",e)
        
        result.message="Unknown error, Please try again later"
        if (e instanceof(AuthError)){
            const err = e.cause?.err
            if (err instanceof ZodError){
               const errdata=parseZodError(err)
               result.message=errdata.message
               result.errInputs=errdata.paths
            }
            else if(err instanceof CustomError)
                result.message=err.message
        }
    }
    if (result.ok)
        redirect(callbackUrl?callbackUrl:"/profile")

    return result
}

export const register=async(formData:FormData,callbackUrl?:string) =>{
    const result:authResponseType={
        ok:false,
    }
    try{
        
        const{email,password,fullname} = await registerSchema.parseAsync({
            email:formData.get('email'),
            fullname:formData.get('fullname'),
            "confirm password":formData.get('confirm password'),
            password:formData.get('password')
        })
        console.log(email)

        if (await isUserInDB(email))
            throw new LoginError("Account already exists")
        
        console.log("no pre-exisiting user with that email")

        const hashedPassword=await hashPassword(password)
        
        console.log("Hashed Password")

        await addUserToDb(email,hashedPassword,fullname)

        console.log("Added new User to DB")


        console.log("Attempted Login")

       
        const loginResult = await tryLoginEmail(email,password,callbackUrl)

        if(!loginResult.ok){
            // setTimeout(2000,redirectToLogin.bind(callbackUrl))
            console.log(loginResult.message)
            result.redirect=true
            throw new LoginError("Account Created, redirecting you to login")
        }
        result.ok=true

    }catch(e){
        if (e instanceof ZodError){
            const errdata=parseZodError(e)
            result.message=errdata.message
            result.errInputs=errdata.paths
         }else if(e instanceof CustomError){
            result.message=e.message
        }
        else result.message="Unknown error, please try again later"
    }finally{
        const email=formData.get('email') as string
        const password=formData.get('password') as string

    }

    return result
} 


export const logout=async()=>{
    try{
        const res = await signOut({redirect:false})
    }catch(e){
        console.error("error",e)
        return;
    }finally{
        redirect("/login")
    }
}

// export const redirectToLogin("/login")