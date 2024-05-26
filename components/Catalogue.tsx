import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchFilters from './CatalogueSearchFilters'
import CatalogueItem from './CatalogueItem'
import { FoodType } from '../libs/types';
import { sfetch } from '@/utils/serverFetch'
import { auth } from '@/auth';




type cataloguePropsType={
  params:{}
}
const Catalogue = async() => {
  const foods = await getFoods()
  return (
    <div className='my-10 w-full'>
       <SearchFilters />
       <div className='flex-wrap centered gap-5 py-10 h-full mx-auto px-0 container pb-20'>
            {foods.map((food,index)=>(
                <CatalogueItem index={index} key={`${food.name}-${food.vendor}`} food={food}/>
            ))}
       </div>
    </div>
  )
}

export default Catalogue

async function getFoods(){
    const res = await sfetch(`/api/get-foods`)
    if (!res.ok)
      throw new Error("An Error occurred while fetching it")
    const {foods} = await res.json()

    return foods as FoodType[];
}
async function getFourites(){
  const session=await auth()
  const res = await sfetch(`/api/get-foods${session?("?id="+session.user?.id):""}`)
  if (!res.ok)
    throw new Error("An Error occurred while fetching it")
  const {foods} = await res.json()
  
  return foods as FoodType[];
}


