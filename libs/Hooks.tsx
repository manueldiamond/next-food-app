"use client"
import { isFavouriteFood, setFavouriteFood } from "@/utils/db";
import { type } from "os";
import { useEffect, useRef, useState } from "react";


export const useFavourite=(userid:string,foodid:string,def?:boolean)=>{
    type favouriteStateType={favourite?:boolean,previousValue?:boolean,toUpdate?:boolean}
    const [{favourite,previousValue,toUpdate},setFavState]=useState<favouriteStateType>({favourite:def,previousValue:def,toUpdate:typeof def==='undefined'});
    const intervalRef = useRef<any>(null)
    
    const editState=(changes:favouriteStateType|((current:favouriteStateType)=>favouriteStateType))=>
        setFavState(prevState=>({
            ...prevState,
            ...(typeof changes==='function'?changes(prevState):changes)
    }))
    const toggleFavourite=()=>{
        editState((current)=>({favourite:!current.favourite,toUpdate:true}))
    }
    // const setUpdate=(update:boolean)=>editState(setU)
    useEffect(()=>{
        clearInterval(intervalRef.current)
        const queryDB=async(tries=0)=>{
            console.log("pre-favourite",favourite)
            if(!userid) return;
            try{
                if(typeof previousValue==='undefined'){
                    const favourite= await isFavouriteFood(foodid,userid)
                    editState({previousValue:favourite,favourite})
                }else{
                    let fav=favourite
                    await setFavouriteFood(foodid,userid,fav as boolean)
                    editState({previousValue:fav})
                }
            }catch(e){
                editState({favourite:previousValue})
            }
            console.log("post-favourite",favourite)
        }
        
        if (toUpdate){
            intervalRef.current = setTimeout(queryDB,1000)
            editState({toUpdate:false})
        }
    
    return ()=>(clearInterval(intervalRef.current))
    },[favourite])
    return {favourite,toggleFavourite}
}