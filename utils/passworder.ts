import { compare, hash } from "bcryptjs"

export const hashPassword=async(password:string)=>{
    const hashedPassword=await hash(password, 4 )
    return hashedPassword;
}
export const isPasswordValid=async(password:string,hash:string)=>{
    const valid=await compare(password,hash)
    return valid
}