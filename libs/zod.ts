import { ZodError, number, object, string } from "zod"
 
export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
})

export const registerSchema = signInSchema.extend({
  "confirm password": string({ required_error: "Confirm your password" }),
  fullname: string().min(3, "Fullname must be more than 3 characters"),
}).refine((data)=>data["confirm password"]===data.password,{
  message:"Passwords don't Match",
  path:["confirm password"]
})

export const profileDetailsSchema = object({
  name:string().min(3, "Fullname must be more than 3 characters"),
  deliveryaddress:string().min(3, "Address must be more than 3 characters").optional()
}) 

export const parseZodError=(err:ZodError)=>({
  message:err.errors.map((zoderr)=>zoderr.message).join("\n"),
  paths:err.errors.map(zoderr=>zoderr.path[0] as string)
})


export const foodSchema = object({
  name: string(), // Required
  vendor: string().nullable(), // Nullable field
description:string(), // Required
  preptime: string().nullable(), // Nullable field
  rating: number().positive().min(0).max(5), // Number field, required
  price: number().positive(), // Number field, required
});
