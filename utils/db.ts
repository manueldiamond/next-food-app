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

        e instanceof Error&&console.error(e.message)
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
                    from users where lower(email)=${email.toLowerCase()}
                    limit 1;`
    if (rows.length>0)
        return rows[0] as userWithPass
})

export const addUserToDb=async(email:string,hashedPass:string,name:string)=>tryCatchConnectionErr(async()=>{
    await sql`insert into users (email,name,pass) values
            (${email.toLowerCase()},${name},${hashedPass});`
})

export const getFoods=async(id:string="",filters:Partial<{search:string,category:string}>)=>tryCatchConnectionErr(async()=>{
    
    const {search,category}=filters
    const params=[]
   
    const lastAddedParam=()=>"$"+(params.length)

    let query=`select food.* `
    if(id){
        query+=` , case 
                when fav.foodid is not null 
                then true else false 
                end  as "favourite" `
        params.push(id)
    }
        query+=` from food 
            ${id?`left join 
            (select foodid from favourites where userid=$1 )
             as fav on food.id = foodid`:""} `
    if (search){
        params.push(`%${search.toLowerCase()}%`)
        const searchparam=lastAddedParam()
        query+=` where lower(name) like ${searchparam} or lower(description) like ${searchparam}  or lower(vendor) like ${searchparam} `
    }
    if (category){
        params.push(`%${category.toLowerCase()}%`)
        query+=`where lower(tags) like ${lastAddedParam()}`
    }

    console.log(query)
    console.log(params)
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
                    and userid = ${userid}
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
