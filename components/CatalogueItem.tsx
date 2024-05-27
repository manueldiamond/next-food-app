import { FoodType } from '@/libs/types';
import { setFavouriteFood } from '@/utils/db';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import FavouriteButton from './FavouriteButton';


type catalogueItemProps={
    food:FoodType,
    userid?:string,
    index:number,
    key:any,
}

const CatalogueItem=(
    {food,key,index,userid}:catalogueItemProps
)=>{
    console.log(userid)
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
            {userid&&<FavouriteButton className='w-8' foodid={food.id} defaultValue={food.favourite} userid={userid!}/>}
        </div>
    </div>
    )
}

export default CatalogueItem