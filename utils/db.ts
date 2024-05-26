"use server"

import { auth } from "@/auth"
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
   
    const {rows}=
         await sql`select name,id,pass,profileImage
                    from users where email=${email.toLowerCase()}
                    limit 1;`
    if (rows.length>0)
        return rows[0] as userWithPass
})

export const addUserToDb=async(email:string,hashedPass:string,name:string)=>tryCatchConnectionErr(async()=>{
    await sql`insert into users (email,name,pass) values
            (${email},${name},${hashedPass});`
})

export const getFoods=async(id:string="")=>tryCatchConnectionErr(async()=>{
    const {rows}= !(id) ?
        await sql`select * from food` :
        await sql`select food.* , 
            case 
                when favourites.userid = '7949627b-a45d-44cb-bf87-7e321b9e71c9' 
                then true 
                else false 
            end  as "isfavourite"
        from food inner join favourites on food.id = foodid
        `
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
    const {rows} = await sql`select * from food 
                            inner join favourites 
                            on food.id=favourites.foodid
                            where userid=${id}`
    return rows
})

export const setFavouriteFood=async(foodid:string,userid:string,favourite:boolean)=>tryCatchConnectionErr(async()=>{
    const {rows} = await (favourite?
                            sql`insert into favourites 
                                (foodid,userid) values
                                (${foodid},${userid})`
                            :
                            sql`delete from favourites 
                             where foodid = ${foodid} 
                             and userid = ${userid})
                            `)
    return rows
})



export const isFavouriteFood=async(foodid:string,userid:string)=>tryCatchConnectionErr(async()=>{
    const {rows} = await  sql`select exists(select 1 from favourites
                                where foodid = ${foodid} 
                                and userid = ${userid}) as "favourite"`
    return rows.length>0    
})

export const saveUserDataToDb=async({name,deliveryaddress,id,profileimage}:userDataType)=>tryCatchConnectionErr(async()=>{

    await sql`
        update users set
            name = ${name} ,
            deliveryaddress = ${deliveryaddress},
            profileimage = ${profileimage} 
        where id = ${id}; `
})
