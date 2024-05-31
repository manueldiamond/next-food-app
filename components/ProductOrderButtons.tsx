"use client"
import React, { useRef } from 'react'
import { Counter, Slider } from '.'
import Link from 'next/link'
import { FoodType } from '@/libs/types'
import { useRouter } from 'next/navigation'
import { useObjectState } from '@/libs/Hooks'

export const ProductOrderButtons = ({data}:{data:FoodType}) => {
    const router=useRouter()
    const [state,setState]=useObjectState({count:1,slider:"mid-spicy"})
    const {count,slider}=state
    const orderNow=()=>{
        router.push(`/products/payment?amount=${count}&item=${data.id}&name=${slider}`)
        
    }
  return (
    <>
        <div className='flex h-full py-5 justify-between'>

            {/* TODO:set the spicy range from DB */}
        <Slider onChange={(slider)=>setState({slider})} ranges={["no-spice","low-spice","mid-spicy","very-spicy","extra-spicy"]}/> 
        <Counter onChange={(count)=>setState({count})} label='Portion'/>
        </div>
        <div className='flex-1 min-h-[2rem]'/>
        <div className='flex  font-semibold text-white text-lg justify-between h-[70px]'>
            <div className=' rounded-20 centered bg-gray-2 px-3 h-full shadow-xl'>GH₵ {data.price}</div>
            <button onClick={orderNow} className='  click-scale accent-button !border-none  centered uppercase !w-max !px-20 h-full shadow-xl'>Order Now</button>
        </div>
    </>
  )
}
