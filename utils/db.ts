"use server"

import { ConnectionError, FoodType, userDataType, userType, userWithPass } from "@/libs/types"
import { sql } from "@vercel/postgres"
import { type } from "os"

// export const fetchCache = "force-no-store";
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
            (${email.toLowerCase()},${name},${hashedPass});`
})

export const getFoods=async(id:string="",filters:Partial<{search:string,category:string|string[]}>)=>tryCatchConnectionErr(async()=>{
    const {search,category}=filters
    let query=`select food.* ${id?`case 
            when fav.foodid is not null 
            then true else false 
            end  as "favourite"`:""}
            from food 
            ${id?`left join (
                select foodid from favourites where userid=$1 
            ) as fav on food.id = foodid`:""}
            ${search?`where name like $2 or description like $2 or vendor like $2`:""}
            ${category?`where tags like $3`:""}
        `
    
    const params=[id,`%${search}%`,`%${category}%`]

    const {rows}= await sql.query(query,params)
    //         select food.* ${sql``} from food
            
    //     `
    //     :
    //     (await sql`select food.* , 
            
    //         l)
    return rows as (FoodType)[]
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
    const {rows} = await sql`select food.* from food 
                            inner join favourites 
                            on food.id=favourites.foodid
                            where userid=${id}`
    return rows as FoodType[]
})

export const setFavouriteFood=async(foodid:string,userid:string,favourite:boolean)=>tryCatchConnectionErr(async()=>{
    await (favourite?sql`insert into favourites 
                    (foodid,userid) values
                    (${foodid},${userid}) 
                    on conflict do nothing`
                    :
                    sql`delete from favourites 
                    where foodid = ${foodid} 
                    and userid = ${userid})
                `)
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
