"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"


const filters = [
    "All",
    "Combos",
    "Best Rated",
    "Fast Foods",
]

type searchFiltersProps={
    onSearch?:(term:string)=>void,
    onFilter?:(category:string)=>void,
    selectedCategory?:string
    defaultText?:string
}

const SearchFilters=({onSearch,defaultText,onFilter,selectedCategory}:searchFiltersProps)=>{
    if(!selectedCategory&&typeof selectedCategory==="string")  selectedCategory="All"
    const [searchValue,setSearchValue]=useState(defaultText)
    const router = useRouter()    
    const path = usePathname()
    const [active,setActive]=useState(false)
    let navigate:(href: string)=> void
    if (!path.includes("search"))
        navigate=router.push
    else
        navigate=router.replace
    const filter=(filter:string)=>{
        if (filter==="All") filter=""
        if(onFilter) onFilter(filter)
        else navigate("/search?query="+searchValue+"&filter="+filter)
    }
    const search=(data:FormData)=>{
        const searchterms=data.get('search-terms') as string

        if(!searchterms)   return;

        if (onSearch)   
            onSearch(searchterms)
        else{
            navigate("/search?query="+searchterms)
        }
    }
    return(
    <div className='w-full'>
        <form action={search} className=" container search__filters w-full flex gap-5">
            <div className={` ${active?" scale-105 shadow-[0px_4px_20px]":"shadow-sm"} transition-shadow search__bar my-1 text-[#3C2F2F] min-h-[60px] bg-white flex gap-5 rounded-[20px] flex-1 centered pl-5  shadow-black/20`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`${active?"w-1 h-1":"w-6 h-6"} transition-all`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input 
                    placeholder="Search" 
                    name='search-terms' 
                    value={searchValue}
                    onChange={(e)=>setSearchValue(e.target.value)}
                    className=' outline-none text-lg font-medium bg-transparent flex-1 h-full w-full'
                    onFocus={()=>setActive(true)}   
                    onBlur={()=>setActive(false)} 
                />
            </div>
            <button className={ `${active?"w-[0px] opacity-0 !p-0 h-[60px]":" w-[60px] h-[60px] "} !transition-all bg-accent rounded-[20px] shadow-xl centered `}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1_43)">
                        <path d="M10.7 2.62535C10.4188 2.02749 9.9733 1.522 9.41551 1.16794C8.85771 0.813871 8.21068 0.625854 7.55 0.625854C6.88932 0.625854 6.24229 0.813871 5.68449 1.16794C5.1267 1.522 4.68118 2.02749 4.4 2.62535H1.5C1.10218 2.62535 0.720644 2.78338 0.43934 3.06469C0.158035 3.34599 0 3.72752 0 4.12535H0C0 4.52317 0.158035 4.9047 0.43934 5.18601C0.720644 5.46731 1.10218 5.62535 1.5 5.62535H4.395C4.67618 6.2232 5.1217 6.7287 5.67949 7.08276C6.23729 7.43683 6.88432 7.62484 7.545 7.62484C8.20568 7.62484 8.85271 7.43683 9.41051 7.08276C9.9683 6.7287 10.4138 6.2232 10.695 5.62535H22.5C22.8978 5.62535 23.2794 5.46731 23.5607 5.18601C23.842 4.9047 24 4.52317 24 4.12535C24 3.72752 23.842 3.34599 23.5607 3.06469C23.2794 2.78338 22.8978 2.62535 22.5 2.62535H10.7Z" fill="white"/>
                        <path d="M16.455 8.49939C15.7944 8.50057 15.1477 8.68911 14.5899 9.04312C14.0321 9.39714 13.5863 9.90211 13.304 10.4994H1.5C1.10218 10.4994 0.720644 10.6574 0.43934 10.9387C0.158035 11.22 0 11.6016 0 11.9994H0C0 12.3972 0.158035 12.7787 0.43934 13.0601C0.720644 13.3414 1.10218 13.4994 1.5 13.4994H13.3C13.5812 14.0972 14.0267 14.6027 14.5845 14.9568C15.1423 15.3109 15.7893 15.4989 16.45 15.4989C17.1107 15.4989 17.7577 15.3109 18.3155 14.9568C18.8733 14.6027 19.3188 14.0972 19.6 13.4994H22.5C22.8978 13.4994 23.2794 13.3414 23.5607 13.0601C23.842 12.7787 24 12.3972 24 11.9994C24 11.6016 23.842 11.22 23.5607 10.9387C23.2794 10.6574 22.8978 10.4994 22.5 10.4994H19.605C19.3228 9.90226 18.8771 9.3974 18.3195 9.04339C17.762 8.68939 17.1154 8.50075 16.455 8.49939Z" fill="white"/>
                        <path d="M7.545 16.3744C6.88455 16.3758 6.23804 16.5644 5.68048 16.9184C5.12292 17.2724 4.67718 17.7773 4.395 18.3744H1.5C1.10218 18.3744 0.720644 18.5324 0.43934 18.8137C0.158035 19.095 0 19.4766 0 19.8744H0C0 20.2722 0.158035 20.6537 0.43934 20.935C0.720644 21.2163 1.10218 21.3744 1.5 21.3744H4.395C4.67618 21.9722 5.1217 22.4777 5.67949 22.8318C6.23729 23.1859 6.88432 23.3739 7.545 23.3739C8.20568 23.3739 8.85271 23.1859 9.41051 22.8318C9.9683 22.4777 10.4138 21.9722 10.695 21.3744H22.5C22.8978 21.3744 23.2794 21.2163 23.5607 20.935C23.842 20.6537 24 20.2722 24 19.8744C24 19.4766 23.842 19.095 23.5607 18.8137C23.2794 18.5324 22.8978 18.3744 22.5 18.3744H10.7C10.4175 17.7765 9.97094 17.2711 9.41241 16.9171C8.85388 16.563 8.2063 16.3748 7.545 16.3744Z" fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1_43">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </button>
        </form>
       {selectedCategory&&<ul className='py-8 container !max-w-max flex gap-3 overflow-x-scroll scroll-smooth scrollbar-hidden  h-max'>
       {filters.map(item=>(
           <li onClick={()=>filter(item)} key={item} className={`${item===selectedCategory?" bg-accent text-[#F5F5F5] shadow-md":" font-medium text-base bg-[#F3F4F6] text-gray-2 cursor-pointer hover:text-accent"} rounded-[20px] px-6 py-3`}>
               {item}
           </li>
       ))}
       </ul>}
    </div>
    )
}

export default SearchFilters