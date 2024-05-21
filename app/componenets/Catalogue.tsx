import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchFilters from './CatalogueSearchFilters'
import CatalogueItem from './CatalogueItem'


const foods=Array(10).fill(
    {
        name:"Cheeseburger",
        vendor:"Wendy's",
        img:"/some-ham.png",
        id:"1",
        rating:4.9
    }
)




const Catalogue = () => {
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