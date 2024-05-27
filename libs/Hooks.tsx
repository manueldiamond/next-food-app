"use client"
import { isFavouriteFood, setFavouriteFood } from "@/utils/db";
import { useEffect, useState } from "react";

export const useFavourite=(def:boolean=false,userid:string,foodid:string)=>{
    const [favourite,setFavourite]=useState<undefined|null|boolean>(def);
    const toggleFavourite=()=>setFavourite(prevFav=>!prevFav)
        useEffect(()=>{
            const queryDB=async()=>{
                if(!userid) return;
                try{
                    await setFavouriteFood(foodid,userid,favourite as boolean)
                    const fav = await isFavouriteFood(foodid,userid)
                    if (fav!==favourite){
                        setFavourite(fav)
                    }
                }catch(e){
                    
                }
            }
            
        },[favourite])
    return {favourite,toggleFavourite}
}