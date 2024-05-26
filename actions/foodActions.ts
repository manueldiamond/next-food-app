"use server"

import { isFavouriteFood, setFavouriteFood } from "@/utils/db"

export async function setFavourite(foodid:string,userid:string,fav:boolean){
    try{
        await setFavouriteFood(foodid,userid,fav)
    }catch{
        console.log("FAVOURITE NOT SET")
    }
}
export async function isFavourite(foodid:string,userid:string){
    try{
       return await isFavouriteFood(foodid,userid)
    }catch{
        console.log("ERROOR")
    }
}