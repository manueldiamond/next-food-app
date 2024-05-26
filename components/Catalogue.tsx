"use client"
import React from 'react'
import SearchFilters from './CatalogueSearchFilters'
import CatalogueItem from './CatalogueItem'
import { FoodType } from '../libs/types';
import useSWR from 'swr'
import { ErrorText, Spinner } from '.';
import { useCatalogueItems } from '@/utils/dataFetches';
import LoadingComponent from './LoadingComponent';

const Catalogue = ({userid="string"}) => {
  const {foods,error,isLoading} = useCatalogueItems(userid)
  return (
    <div className='my-10 w-full'>
       <SearchFilters />
        <div className='flex-wrap centered gap-5 py-10 h-full mx-auto px-0 container pb-20'>
           <LoadingComponent loading={isLoading} error={error} buffering>
            {foods&&foods.map((food:FoodType,index:number)=>(
              <CatalogueItem index={index} key={`${food.name}-${food.vendor}`} food={food}/>
              ))}
           </LoadingComponent>
       </div>
    </div>
  )
}

export default Catalogue

