"use client"
import React from 'react'
import SearchFilters from './CatalogueSearchFilters'
import CatalogueItem from './CatalogueItem'
import { FoodType } from '../libs/types';
import useSWR from 'swr'
import { ErrorText, Spinner } from '.';
import LoadingComponent from './LoadingComponent';
import { useCatalogueItems } from '@/libs/dataFetches';
import { useObjectState } from '@/libs/Hooks';

const Catalogue = ({userid}:{userid?:string}) => {

  const {foods,error,isLoading,activeFilter,setFilter} = useCatalogueItems(userid)

  return (
    <div className='my-10 w-full'>
       <SearchFilters onFilter={setFilter}/>
        <div className='flex-wrap centered gap-5 py-10 h-full mx-auto px-0 container pb-20'>
           <LoadingComponent loading={isLoading} error={error} >
            {foods&&foods.map((food:FoodType,index:number)=>(
              <CatalogueItem index={index} userid={userid} key={`${food.id}`} food={food}/>
              ))}
           </LoadingComponent>
       </div>
    </div>
  )
}

export default Catalogue

