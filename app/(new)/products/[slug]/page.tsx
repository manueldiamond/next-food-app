
import { Counter, Slider } from '@/componenets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type productDataProps={
    
      "image":string,
      "name":string,
      "description":string,
      "price":number,
      "time":string,
      "rating":number,
      "id":number
    
}

type staticParamsPropsType={
  params:{
    id:string|number
  }
}

const page = async({params}:staticParamsPropsType) => {
  const data:productDataProps = await getProductData(params.id)
  return (
    <main className='container flex flex-col h-full pb-8'>
      <Image className='mx-auto' src={data.image} width={350} height={350} alt={"product image"}/>

      <h3 className='text-2xl mt-5 font-semibold text-gray-1'>{data.name}</h3>
      <div className='flex items-center py-4 rating__and__time'>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9781 15.5435L8.00013 11.8848L3.02213 15.5435L4.93346 9.63479L-0.0418701 5.99945H6.1008L8.00013 0.0807877L9.89946 5.99945H16.0415L11.0668 9.63479L12.9781 15.5435Z" fill="#FF9633"/>
        </svg>
        <span className='mr-2 text-gray-3 text-[15px]'> {data.rating} - {data.time}</span>
      </div>
    
      <p className='text-gray-2 text-base'>{data.description}</p>

      <div className='flex py-5 justify-between'>
        <Slider label='Spicy'/> 
        <Counter label='Portion'/>
      </div>
      <div className='flex-1 min-h-[2rem]'/>
      <div className='flex  font-semibold text-white text-lg justify-between h-[70px]'>
          <div className=' rounded-20 centered bg-accent px-3 h-full shadow-xl'>GH₵ {data.price}</div>
          <Link href={`payment?item=${data.id}`} className=' click-scale rounded-20 centered uppercase bg-gray-1 px-20 h-full shadow-xl'>Order Now</Link>
      </div>
    </main>
  )
}


// This function gets called at build time
export async function generateStaticParams() {
  // Call an external API endpoint to get posts
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()
  const products=[{id:1}]
  // Get the paths we want to pre-render based on posts
  const paths:staticParamsPropsType[] = products.map((product) => ({
    params: { id: product.id },
  }))
 
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return paths
}
 
// This also gets called at build time


async function getProductData(id:string|number) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  // const res = await fetch(`https://.../posts/${params.id}`)
  // const post = await res.json()
  
   // TO-DO fetch product data from api
   const data:productDataProps={
    "image":"/some-ham.png",
    "name":"Some Random Burger",
    "description":"The Cheeseburger Wendy's Burger is a classic fast food burger that packs a punch of flavor in every bite. Made with a juicy beef patty cooked to perfection, it's topped with melted American cheese, crispy lettuce, ripe tomato, and crunchy pickles.",
    "price":8.25,
    "time":"26 mins",
    "rating":4.9,
    "id":1
  }

  return data
}


export default page