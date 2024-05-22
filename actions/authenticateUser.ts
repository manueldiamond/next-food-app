"use server"
type authResponseType=Promise<{
    ok:boolean;
    emailRegistered?:boolean;
    message?:string;
    
}>

export const tryLogin=async(email:string,password:string):authResponseType =>{
    console.log("LEAKED DATA: ",email,password)
    
} 
export const tryRegister=async(email:string,password:string,fullname:string):authResponseType =>{
    
} 