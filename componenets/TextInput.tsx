"use client"
import Image from 'next/image'
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'

const  TextInput = ({defaultValue="",error=false, required=false ,onChange=(val:any)=>{}, label="",name="",type="",disabled=false}) => {
    const [value,setValue]=useState(defaultValue)
    const [focused,setFocused]=useState(value!=="")
    const changed=(e:ChangeEvent<HTMLInputElement>)=>{
      setValue(e.target.value)
      onChange(e.target.value)
    }
  return (
    <div className={`${error?" border-red-500 ":" border-[#E1E1E1] "} my-4 w-full bg-white  min-h-[60px] relative border-solid rounded-20 border-2`}>
        <label style={
            {left:focused?"30px":"40px",top:focused?"0%":"50%",scale:focused?1:1.05,transformOrigin:`center center`}
        } className=' rounded-full whitespace-nowrap text-[#808080] -translate-y-1/2 transition-[left_top] bg-white p-1 w-min h-min absolute flex centered'>
            <span>{label}</span>
            {(type==="password")&&<Image 
                className='ml-1'
                src={'/icons/lock.svg'} 
                width={15} 
                height={15}
                alt="password lock icon"/>}
        </label>
        <input 
            value={value}
            onChange={changed}
            onFocus={()=>setFocused(true)}
            onBlur={()=>setFocused(!(value===""))} 
            type={type}
            name={name}
            required={required}
            disabled={disabled}
            className='text-gray-1 rounded-20 px-10 outline-none text-lg font-semibold bg-white w-full h-full ' />
    </div>
  )
}

export default TextInput