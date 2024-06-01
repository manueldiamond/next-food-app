"use client"
import Image from 'next/image'
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'

const  TextInput = ({extra:any=undefined,className="", defaultValue="",error=false, required=false ,onChange=(val:any)=>{}, label="",name="",type="",disabled=false}) => {
    const [value,setValue]=useState(defaultValue)
    const [focused,setFocused]=useState(value!=="")
    const changed=(e:ChangeEvent<HTMLInputElement>)=>{
      setValue(e.target.value)
      onChange(e.target.value)
      if(e.target.value)
        setFocused(true)
    }
    label=label?label:name
    const MyInput=useCallback((props:any)=>{
      return(
        type==="area"?
        <textarea {...props}  className={"resize-none pt-4 min-h-32  "+props.className} ></textarea>
        :
        <input {...props}></input>
      )
    },[type])
  return (
    <div key={name} className={`${className} ${error?" border-red-500 ":" border-[#E1E1E1]"} my-4 w-full flex py-1 bg-white h-[50px]  md:min-h-[60px] relative border-solid rounded-2xl md:rounded-20 border-2 `}>
        <label style={
            {left:focused?"30px":"40px",top:focused?"0%":"50%",scale:focused?1:1.05,transformOrigin:`center center`}
        } className='overflow-visible pointer-events-none select-none rounded-full whitespace-nowrap text-[#808080] -translate-y-1/2 transition-[left_top] bg-white p-1 w-min h-min absolute flex centered  text-xs md:text-base'>
            <span className='pointer-events-none select-none'>{label}</span>
            {(type==="password")&&<Image 
                className='ml-1 pointer-events-none select-none'
                src={'/icons/lock.svg'} 
                width={15} 
                height={15}
                alt="password lock icon"/>}
                
        </label>
        <MyInput
            type={type}
            name={name}
            value={value}
            onChange={changed}
            required={required}
            disabled={disabled}
            onFocus={()=>setFocused(true)}
            onBlur={()=>setFocused(!(value===""))} 
            className={ `${disabled?" autofill:bg-transparent flex-1 text-gray-400":"text-gray-1"}  rounded-20 px-10 outline-none  text-base md:text-lg font-semibold bg-white w-full  `} 
          />
    </div>
  )
}

export default TextInput