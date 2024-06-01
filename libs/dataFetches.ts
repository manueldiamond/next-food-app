"use client"
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { error } from 'console';
import loading from '../app/loading';
import { FoodType, paymentMethodType, userDataType } from '@/libs/types';
import { useObjectState } from './Hooks';
import { useState } from 'react';
import exp from 'constants';

const fetcher = (input:string | Request | URL, init?: RequestInit | undefined) =>
     fetch(input,{...init,next:{...init?.next,tags:["fetcher"],revalidate:20}})
     .then(res =>{
        if(!res.ok)
            throw new Error()

    return res.json()
})

export const useCatalogueItems=()=>{
    const [filter,setFilter]=useState<string>("")

    let url=`/api/get-foods?filters=${filter}`

   const result = useSWR(url,fetcher,{revalidateOnFocus:false,refreshWhenHidden:false})
   return {...result,foods:result.data?.foods as FoodType[],setFilter,activeFilter:filter}
}

export const useProductdData=(id?:string)=>{
    const defaults = {
        description:"",
        id:"",
        img:"/some-ham.png",
        preptime:"",
        name:"Burger",
        price:0,
        rating:0,
        vendor:"Vendor A",            
}
    if(!id){
        return {
            isLoading:false,
            error:"",
            mutate:()=>{},
            data:defaults as FoodType}
    }
   let url=`/api/get-food-by-id/${id}`

   const result = useSWR(url,fetcher,{revalidateOnFocus:false,refreshWhenHidden:false})
   return {...result,data:result.data?.data.name?(result.data?.data):defaults as FoodType}
}

export const useGetUserData=()=>{    
    const result = useSWR(`/api/get-user-data`,fetcher,{revalidateOnFocus:false,refreshWhenHidden:false})
    return {...result,data:result.data?.data as userDataType}
    
}

export const usePaymentMethods=()=>{
    const result = useSWR(`/api/get-user-payment-info`,fetcher,{revalidateOnFocus:false,refreshWhenHidden:false})
    // if(result.error)  result.error=""
    return {...result,data:(result.data?.data?result.data?.data:[] )as paymentMethodType[]}
}