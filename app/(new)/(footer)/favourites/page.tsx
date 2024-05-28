import { auth } from '@/auth'
import {  ListedProduct as FavouritesItem, Footer, HeaderControls } from '@/components'
import { FoodType } from '@/libs/types'
import { getFavouriteFoods } from '@/utils/db'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
    const session = await auth()
    if(!session?.user?.id){
        redirect('/login')
        return (<div/>)
    }
    const favouriteFoods = await getFavourites(session.user.id)

  return (
    <div className=''>

        <h1 className='text-3xl text-gray-3 pb-6 font-bold'>Favourites</h1>
        <div className='flex flex-wrap gap-3 '>
            {favouriteFoods?favouriteFoods.map((food,i)=>(
                <FavouritesItem key={food.id} userid={session.user?.id!} food={{...food,favourite:true}}/>
            ))
            :<div className='text-gray-3 mx-auto text-center italic py-10 text-sm'>No favourites to show</div>
            }
        </div>

    </div>
  )
}

export default page

async function getFavourites(userid:string) {
    try{
        const foods = await getFavouriteFoods(userid)
        return foods
    }catch(e){
        if(e instanceof Error)
            console.log(e.message)
        return process.env.NODE_ENV==="development"?[{
            name:"beast burger",
            id:"oaokdoksodakd-sdadsakd-da-d-skdas-d",
            description:"MRRR BEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAST burger so good. wow. I wanna die, smebody kill me now please",
            preptime:"20years",
            vendor:"Beast",
            img:"/some-ham.png",
            price:5000,
            published:true,
            rating:20
        },
        {
            name:"beast burger",
            id:"oaokdoksodakd-ritsu-da--d-skdas-d",
            description:"MRRR BEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAST burger so good. wow. I wanna die, smebody kill me now please",
            preptime:"20years",
            vendor:"Beast",
            img:"/some-ham.png",
            price:5000,
            published:true,
            rating:20
        },
        {
            name:"beast burger",
            id:"oaokdoksodakd-sdad-d-skdas-d",
            description:"MRRR BEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEAST burger so good. wow. I wanna die, smebody kill me now please",
            preptime:"20years",
            vendor:"Beast",
            img:"/some-ham.png",
            price:5000,
            published:true,
            rating:20
        },
        
        ] satisfies FoodType[]
        :
        undefined
    }
}