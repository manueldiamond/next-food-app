"use client"

import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'

const Slider = ({label="slider",minText="Min", maxText="Max",defaultValue=50}) => {
    const [value,setValue]=useState(defaultValue)
    const handleChange=(event:ChangeEvent<HTMLInputElement>)=>setValue(Number(event.target.value))
    
    return (
    <div className=' flex flex-col w-min min-w-[165px]'>
        <p className='text-gray-1'>{label}</p>
        <div className=' relative centered'>
            <input
                type="range"
                min={0}
                max={100}
                step={10}
                value={value}
                onChange={handleChange}
                className=" slider my-3 relative bg-accent yellow-shadow"
            />
            <div style={{
                clipPath:`inset(0% ${100-value}% 0% 0%)`,
                transformOrigin:"left"
            }} className='z-[1] pointer-events-none absolute translate-x-0 w-full h-[7px] rounded-full bg-accent'/>
            <div style={{
                left: `${value}%`,
                translate: `-${(value)}% 0`
            }} className='pointer-events-none absolute w-h-[10px] w-[20px] h-[25px] bg-accent z-10 border-white border-solid border-4 rounded-[10px]'/>
        </div>
        <div className='text-xs w-full flex justify-between'>
            <span className='text-[#1CC019]'>{minText}</span>
            <span className='text-[#EF2A39]'>{maxText}</span>
        </div>

    </div>
  )
}

export default Slider