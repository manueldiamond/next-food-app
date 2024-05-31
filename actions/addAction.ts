"use server"
import { FoodType } from "@/libs/types"
import { foodSchema, parseZodError } from "@/libs/zod"
import { error } from "console"
import { ZodError } from "zod"
import { addFoodToDB as addToDB,deleteFoodFromDB,foodExists } from "@/utils/db"
import { updateFoodInDB as updateDB } from '../utils/db';
 
export const addFoodToDB = async(data:Partial<FoodType>) => {
    try{
        if (await foodExists(data.name!,data.vendor))
            throw new Error("Error, food "+data.name+" from vendor "+data.vendor+" already Exists!")
        await foodSchema.parseAsync(data)
        console.log(data)
        await addToDB(data)

    }catch(e){
        if (e instanceof ZodError){
            const zerr = parseZodError(e)
            return {errorPaths:zerr.paths,error:zerr.message}
        }
        return {error:e instanceof Error?e.message:"Unkown Error"}
        // throw new Error("Error Adding to Database")
    }
}


export const updateFoodInDB = async(id:string|null|undefined,data:Partial<FoodType>) => {
    if(!id) return {error:"Product not found"}
    
    try{
        await foodSchema.parseAsync(data)
        console.log(data)
        await updateDB(id,data)

    }catch(e){
        if (e instanceof ZodError){
            const zerr = parseZodError(e)
            return {errorPaths:zerr.paths,error:zerr.message}
        }
        return {error:e instanceof Error?e.message:"Unkown Error"}
        // throw new Error("Error Adding to Database")
    }
}

export const removeProduct =async (id:string) => {
    if(!id) return {error:"Product not found"}
    try{
        const res = await deleteFoodFromDB(id)
        return res
        
    }catch(e){
        return {error:e instanceof Error?e.message:"Unkown Error"}
    }
}