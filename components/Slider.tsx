"use client"

import { useObjectState } from '@/libs/Hooks'
import React, { ChangeEvent, ChangeEventHandler, forwardRef, useEffect, useState } from 'react'

type sliderProps={
    ref?:React.MutableRefObject<string>,
    label?:string,
    ranges:string[]
    minText:string
    maxText:string,
    defaultValue:number,
    onChange:(newVal:string)=>void;
}

const Slider = (({ onChange,label=undefined,ranges=["low","medium","High"],minText="Min", maxText="Max",defaultValue=50}:Partial<sliderProps>) => {
    const getLabelTagAt=(val:number)=>{
        const r = Math.round((val/100)*(ranges.length-1))
        return `${ranges[r]}${label?("-"+label):""}`
    }
    const [state,setState]=useObjectState({value:defaultValue,labelTag:getLabelTagAt(defaultValue)})
    const {value,labelTag}=state

    useEffect(()=>{
        onChange&&onChange(labelTag)
    },[labelTag])

    const handleChange=(event:ChangeEvent<HTMLInputElement>)=>{
        const value=Number(event.target.value)
        setState({
            value,
            labelTag:getLabelTagAt(value)
        })

    }
    const [text,setText]=useState(label)
    return (
    <div className=' flex flex-col w-min min-w-[165px]'>
        <p className='text-gray-1'>{labelTag}</p>
        <div className=' relative centered'>
            <input
                type="range"
                min={0}
                max={100}
                // step={10}
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
})

export default Slider