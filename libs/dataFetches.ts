"use client"
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { error } from 'console';
import loading from '../app/loading';
import { FoodType, userDataType } from '@/libs/types';

const fetcher = (input:string | Request | URL, init?: RequestInit | undefined) =>
     fetch(input,{...init,next:{...init?.next,tags:["fetcher-tag"],revalidate:10}})
     .then(res =>{
        if(!res.ok)
            throw new Error()

    return res.json()
})

export const useCatalogueItems=(id?:string)=>{
    let url="/api/get-foods"
    if (id)
        url+="?id="+id
    
   const result = useSWR(url,fetcher)

   return {...result,foods:result.data?.foods as FoodType[]}
}

export const useGetUserData=(id:string)=>{    
    const result = useSWR(`/api/get-user-data?id=${id}`,fetcher)
    return {...result,data:result.data?.data as userDataType}
    
}