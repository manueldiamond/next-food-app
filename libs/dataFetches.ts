"use client"
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { error } from 'console';
import loading from '../app/loading';
import { FoodType, userDataType } from '@/libs/types';
import { useObjectState } from './Hooks';
import { useState } from 'react';

const fetcher = (input:string | Request | URL, init?: RequestInit | undefined) =>
     fetch(input,{...init,next:{...init?.next,tags:["fetcher"],revalidate:10}})
     .then(res =>{
        if(!res.ok)
            throw new Error()

    return res.json()
})

export const useCatalogueItems=(id?:string)=>{
    const [filter,setFilter]=useState<string>("")

    let url=`/api/get-foods?id=${id}&filters=${filter}`

   const result = useSWR(url,fetcher)
    console.log("FOODS",result.data?.foods)
   return {...result,foods:result.data?.foods as FoodType[],setFilter,activeFilter:filter}
}

export const useGetUserData=(id:string)=>{    
    const result = useSWR(`/api/get-user-data?id=${id}`,fetcher)
    return {...result,data:result.data?.data as userDataType}
    
}