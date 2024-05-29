"use client"
import React, { forwardRef, useEffect, useState } from 'react'

type counterProps={
    label?:string;
    onChange?:(newValue:number)=>void;
    defaultValue?:number;
    min?:number;
    max?:number;
}

const Counter = ({label="Count",onChange,defaultValue=1,min=1,max=99}:counterProps) => {
    const [count,setCount]=useState(defaultValue)
    const addCount=(amt:number)=>setCount(prevCount=>(count>min||amt>0 )&&(count<max||amt<0)?(prevCount+amt):prevCount)
    useEffect(()=>{
        onChange&&onChange(count)
    },[count])
    return (
    <div>
        <p className='text-gray-1'>{label}</p>
        <div className='flex pt-1 gap-2 items-center min-w-[121px] text-white'>
            <button onClick={()=>addCount(-1)} className='add rounded-[10px] bg-accent click-scale w-10 h-10 centered  yellow-shadow'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
            </button>
            <h2 className='text-lg flex-1 text-center font-medium text-gray-1'>{count}</h2>
            <button onClick={()=>addCount(1)} className='add rounded-[10px] bg-accent click-scale w-10 h-10 centered yellow-shadow'>
                <svg xmlns="http://www.w3.org/2000/svg"  strokeWidth={2} stroke='currentColor' viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
  )
}

export default Counter