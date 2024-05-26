
import { Counter, Slider } from '@/components'
import TextLogo from '@/components/TextLogo'
import { FoodType } from '@/libs/types'
import { getFoodById } from '@/utils/db'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'


type staticParamsPropsType={
  params:{
    id:string
  }
}

const page = async({params}:staticParamsPropsType) => {
  const data = await getProductData(params.id)
  return(
    <>
    {data?<main className='container flex flex-col h-full pb-8'>
      <Image className='mx-auto' src={data.img} width={350} height={350} alt={"product image"}/>

      <h3 className='text-2xl mt-5 font-semibold text-gray-1'>{data.name}</h3>
      <div className='flex items-center py-4 rating__and__time'>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9781 15.5435L8.00013 11.8848L3.02213 15.5435L4.93346 9.63479L-0.0418701 5.99945H6.1008L8.00013 0.0807877L9.89946 5.99945H16.0415L11.0668 9.63479L12.9781 15.5435Z" fill="#FF9633"/>
        </svg>
        <span className='mr-2 text-gray-3 text-[15px]'> {data.rating}{data.preptime?` - ${data.preptime}`:""}</span>
      </div>
    
      <p className='text-gray-2 text-base'>{data.description}</p>

      <div className='flex py-5 justify-between'>
        <Slider label='Spicy'/> 
        <Counter label='Portion'/>
      </div>
      <div className='flex-1 min-h-[2rem]'/>
      <div className='flex  font-semibold text-white text-lg justify-between h-[70px]'>
          <div className=' rounded-20 centered bg-gray-2 px-3 h-full shadow-xl'>GH₵ {data.price}</div>
          <Link href={`payment?item=${data.id}`} className=' click-scale accent-button !border-none  centered uppercase !w-max !px-20 h-full shadow-xl'>Order Now</Link>
      </div>
    </main>
      
      :
      <div className='centered flex-col py-20 bg-white'>
        <TextLogo className="opacity-40"/>
        <h1 className='text-gray-400'>Oops, The product youre looking for, appears to be missing</h1>
        <Link href={"/"}><button className='mt-10 rounded-20 p-6 px-10 bg-accent text-white'>Back to Homepage</button></Link>
      </div>}
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


export default page