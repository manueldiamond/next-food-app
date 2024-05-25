"use server"

import { ConnectionError, FoodType, userDataType, userType, userWithPass } from "@/libs/types"
import { sql } from "@vercel/postgres"

const tryCatchConnectionErr=async<T>(tryFunction:()=>T)=>{
    try{
        const result = await tryFunction()
        return result
    }catch(e){
        throw new ConnectionError()
    }
}

export const isUserInDB=async(email:string)=>tryCatchConnectionErr(async()=>{
    const {rows}=await sql`select exists(select 1 from users where email=${email.toLowerCase()}) as "exists";`
    return rows[0].exists as boolean
})

export const getUserFromDb=async(email:string)=>tryCatchConnectionErr(async()=>{
    const {rows}=await sql`select name,id,pass,profileImage from users where email=${email.toLowerCase()} limit 1;`
    if (rows.length>0)
        return rows[0] as userWithPass
})

export const addUserToDb=async(email:string,hashedPass:string,name:string)=>tryCatchConnectionErr(async()=>{
    await sql`insert into users (email,name,pass) values
            (${email},${name},${hashedPass});`
})

export const getFoods=async()=>tryCatchConnectionErr(async()=>{
    const {rows} = await sql`select * from food inner join favourites left join on foodId=food.id `;
    // console.log(rows)
    return rows as (FoodType&{favourite:boolean})[]
})


export const getFoodById=async(id:string)=>tryCatchConnectionErr(async()=>{
    const {rows} = await sql`select * from food where id = ${id} `;
        if(rows.length<=0)
            throw new Error("No Food for you!!")
    return rows[0] as FoodType
})

export const getUserDataById=async(id:string)=>tryCatchConnectionErr(async()=>{
    const {rows} = await sql`select * from users where id = ${id} `;
        if(rows.length<=0)
            throw new Error("User not found")
    const {pass,...data}=rows[0]
    return data as userDataType
})

export const getFavouriteFoods=async(id:string)=>tryCatchConnectionErr(async()=>{
    const {rows} = await sql`select * from food inner join favourites on food.id=favourites.foodId where userId=${id}`
    return rows
})

export const saveUserDataToDb=async({name,deliveryAddress,id,profileImage}:userDataType)=>{
    await sql`
        update users 
            set name=${name} ,
            deliveryaddress=${deliveryAddress},
            profileimage=${profileImage},
        where id = ${id}`
}