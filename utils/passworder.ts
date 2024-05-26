
export const hashPassword=async(password:string)=>{
    const {hash} = require('bcryptjs')
    const hashedPassword=await hash(password, 4 )
    return hashedPassword;
}
export const isPasswordValid=async(password:string,hash:string)=>{
    const {compare} = require('bcryptjs')

    const valid=await compare(password,hash)
    return valid
}