
import { Counter, ProductOrderButtons, Slider } from '@/components'
import FavouriteButton from '@/components/FavouriteButton'
import TextLogo from '@/components/TextLogo'
import { FoodType } from '@/libs/types'
import { getFoodById } from '@/utils/db'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { Session } from 'next-auth';
import { auth } from '@/auth'
import EditIcon from '@/components/EditIcon'
import { isUserAdmin } from '@/libs/Hooks'


type staticParamsPropsType={
  params:{
    id:string
  }
}

const page = async({params}:staticParamsPropsType) => {
  
  const data = await getProductData(params.id)
  const session=await auth()

  if(!data)
    throw new Error("Oops, The product youre looking for, appears to be missing")

  return(
    <>
    <main className='container flex flex-col h-full pb-8'>
      <Image className='mx-auto product-shadow' src={data.img} width={350} height={350} alt={"product image"}/>
      <div className=' flex justify-between max-h-min items-center'>
        <h3 className='text-2xl mt-5 font-semibold text-gray-1'>{data.name}</h3>
        <FavouriteButton className='size-8' foodid={data.id} userid={session?.user?.id!} defaultValue={data.favourite}/>
      </div>
      <div className='relative w-full'>
       {<EditIcon id={data.id}/>}
      </div>
      <div className='flex items-center py-4 rating__and__time'>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9781 15.5435L8.00013 11.8848L3.02213 15.5435L4.93346 9.63479L-0.0418701 5.99945H6.1008L8.00013 0.0807877L9.89946 5.99945H16.0415L11.0668 9.63479L12.9781 15.5435Z" fill="#FF9633"/>
        </svg>
        <span className='ml-2 text-gray-3 text-[15px]'> {data.rating}{data.preptime?` - ${data.preptime}`:""}</span>
      </div>
    
      <p className='text-gray-2 text-base'>{data.description}</p>
      <ProductOrderButtons data={data}/>
    </main>
    </>
  )
}

async function getProductData(id:string) {
  try{
    const data = await getFoodById(id)
    return data as FoodType|null
  }catch(e){

  }
}

// export async function generate
export default page