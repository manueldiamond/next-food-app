"use server"

import { ConnectionError, FoodType, userDataType, userWithPass } from "@/libs/types"
import { sql } from "@vercel/postgres"

// FOOD(id,name,description,c)
// USER(id, name, email, pass, )
const tryCatchConnectionErr=async<T>(tryFunction:()=>T)=>{
    try{
        const result = await tryFunction()
        return result
    }catch(e){
        console.error("EE",e instanceof Error?e.message:e)
        throw new ConnectionError()
    }
}

export const isUserInDB=async(email:string)=>tryCatchConnectionErr(async()=>{
    const {rows}=await sql`select exists(select 1 from users where email=${email.toLowerCase()}) as "exists";`
    return rows[0].exists as boolean
})

export const getUserFromDb=async(email:string)=>tryCatchConnectionErr(async()=>{
    const {rows}=
         await sql`select name,id,pass,profileImage,role
                    from users where lower(email)=${email.toLowerCase()}
                    limit 1;`
    if (rows.length>0)
        return rows[0] as userWithPass
})

export const addUserToDb=async(email:string,hashedPass:string,name:string)=>tryCatchConnectionErr(async()=>{
    await sql`insert into users (email,name,pass,role) values
            (${email.toLowerCase()},${name},${hashedPass},'user');`
})

export const getFoods=async(id:string|undefined="",filters:Partial<{search:string,category:string}>)=>tryCatchConnectionErr(async()=>{
    if (id==="undefined")   id=undefined
    
    const {search,category}=filters
    const params=[]
   
    const lastAddedParam=()=>"$"+(params.length)

    let query=`select food.id, food.name, food.img, food.vendor, food.rating `
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


export const getFoodPriceFromDB =async(foodId:string)=>tryCatchConnectionErr(async()=>{
    const {rows}=await sql`select name , price from food where id=${foodId} limit 1`
    if (rows.length>0)
        return rows[0] as {name:string,price: number}
})

//GPT smartt.!!
export const addFoodToDB = async (food: Partial<Omit<FoodType, 'id'>>) => tryCatchConnectionErr(async () => {
    const columns: string[] = [];
    const values: any[] = [];
    const params: string[] = [];
    
    Object.keys(food).forEach((key ) => {
      const value = food[key as keyof Omit<FoodType, 'id'>]
      if (value !== undefined) {
        columns.push(key);
        values.push(value);
        params.push(`$${values.length}`);
      }
    })
  
    // Construct the query by progressively adding parameters
    
  
    if (columns.length === 0) {
      throw new Error('No valid fields to insert');
    }
  
    const query = `
      INSERT INTO food (${columns.join(', ')})
      VALUES (${params.join(', ')})
    `;
  
    await sql.query(query, values);
  
  });

  export const updateFoodInDB = async (foodid:string,food: Partial<Omit<FoodType, 'id'>>) => tryCatchConnectionErr(async () => {
    const columns: string[] = [];
    const values: any[] = [foodid];
    
    Object.keys(food).forEach((key) => {
      if (key !== 'id') {
        const value = food[key as keyof Omit<FoodType, 'id'>];
        if (value !== undefined) {
          columns.push(`${key} = $${columns.length + 2}`);
          values.push(value);
        }
      }
    });
  
    if (columns.length === 0) {
      throw new Error('No valid fields to update');
    }
  
    const query = `
      UPDATE food
      SET ${columns.join(', ')}
      WHERE id = $1
    `;
  
    await sql.query(query, values);
  });
  

export const foodExists = async (foodname:string,foodvendor:string|null|undefined) => tryCatchConnectionErr(async () => {
    const {rows} = await sql`select exists( select 1 from food where name=${foodname} and vendor=${foodvendor}) as "exists"`
    if (rows.length>0)
        return rows[0].exists
})

export const deleteFoodFromDB =  async (foodid:string) => tryCatchConnectionErr(async () => {
    const { rowCount } = await sql`DELETE FROM food WHERE id = ${foodid}`;
    if (rowCount === 0) {
      return {error:(`No food item found with id: ${foodid}`)}
    }
    return { message: `Food item with id ${foodid} has been deleted` };
 
})