"use client"
import { isFavouriteFood, setFavouriteFood } from "@/utils/db";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { string } from "zod";

export const useObjectState=<T extends object>(obj:T)=>{
    const [state,setState]=useState(obj)

    const editState=(changes:Partial<T>|((current:T)=>Partial<T>))=>
        setState(prevState=>({
            ...prevState,
            ...(typeof changes==='function'?(changes as (current:T)=>T)(prevState):changes)
    }))
    
    // Example: Updating state with a new value
    // editState({ name: 'Updated Name' });
    
    return [state, editState] as [T,typeof editState]
}

export const useFavourite=(userid:string|null|undefined,foodid:string|null,def?:boolean)=>{
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
            if(!(userid && foodid)) return;
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

export const isUserAdmin=(user?:User&{role?:string})=>{
    return (user?.role==="admin")
}
export const useIsAdmin=()=>{
    const {data}=useSession()
    return isUserAdmin(data?.user)
}

export const useModal=()=>{
    const [open,setOpen]=useState(false)
    return({
      open:()=>{setOpen(true)},
      close:()=>{setOpen(false)},
      visible:open
    })
  }
