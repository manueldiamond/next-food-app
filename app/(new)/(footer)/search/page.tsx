import { auth } from '@/auth'
import { ErrorText, ListedProduct, SearchFilters } from '@/components'
import { getFoods } from '@/utils/db'
import React from 'react'

const page = async({searchParams}:{searchParams:Record<string,string>}) => {
    const session=await auth()
    const searchQuery=searchParams['query']
    const results = await search(searchQuery,session?.user?.id)
  return (
    <div>
        <SearchFilters defaultText={searchQuery}/>
        <br/>
        <br/>
        <ul>
        {results.length>0?results.map((food=>(
            <li key={food.id}>
                <ListedProduct 
                    food={food} 
                    userid={session?.user?.id!}
                />
            </li>
        ))):<ErrorText text={"No results found for '"+searchParams.query+"'" }/>}
        </ul>
    </div>
  )
}

export default page



const search =async (searchTerms:string,userid:string|undefined) => {
    try{
        return await getFoods(userid,{search:searchTerms})
    }catch{
        return [ ];
    }
}