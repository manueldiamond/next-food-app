"use client"
import { FoodType } from '@/libs/types';
import { setFavouriteFood } from '@/utils/db';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link'
import { useEffect, useState } from 'react';


type catalogueItemProps={
    food:FoodType
    index:number,
    key:any,
}

const CatalogueItem=(
    {food,key,index}:catalogueItemProps
)=>{
    const [favourite,setFavourite]=useState<undefined|null|boolean>(food.favourite);
    const toggleFavourite=()=>setFavourite(prevFav=>!prevFav)
    const {data:sesh}=useSession()
        useEffect(()=>{
            const t = setTimeout(()=>{
                if(!(sesh?.user&&sesh?.user?.id))  return;
                setFavouriteFood(food.id,sesh?.user.id,favourite as boolean)
            },1000)
            return ()=>{clearTimeout(t)}
        },[favourite])
    return( 
    <div style={
        {
            animationDelay:`${index*.2}s`
        }
    } key={key} className='flex flex-col rounded-[20px] w-[225px] min-h-[185px] transition scale-up-animation group hover:scale-105 hover:shadow-2xl hover:z-10 z-0 mt-2 p-4 bg-white shadow-[0_5px_10px_rgba(0,0,0,.1)]'>
        <Link href={`/products/${food.id}`} className=' text-gray-1'  >
            <Image
                className='flex-1 object-cover group-hover:scale-105 catalogue-display-item-shadow mb-4 mx-auto' 
                src={food.img}
                width={120}
                height={120}
                alt={`picture  of ${food.vendor} ${food.name}`} 
            />
            
            <h6 className='py-0 font-semibold text-base'>{food.name}</h6>
            <p className='-my-1'>{food.vendor}</p>
        
        </Link>

        <div className='rating_and_favourite bottom flex justify-between items-center w-full pt-2'>
            <div className='rating flex gap-1 items-center'>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.9782 15.5435L8.00016 11.8848L3.02216 15.5435L4.93349 9.63479L-0.0418396 5.99945H6.10083L8.00016 0.0807877L9.89949 5.99945H16.0415L11.0668 9.63479L12.9782 15.5435Z" fill="#FF9633"/>
                </svg>

                <span>{food.rating}</span>
            </div>
            {sesh&&<button onClick={toggleFavourite} className='rounded-full heart click-scale '>
                {!favourite?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-accent">
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>}
            </button>}
        </div>
    </div>
    )
}

export default CatalogueItem