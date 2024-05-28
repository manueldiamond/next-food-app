"use client"
import { formInput } from '@/libs/types'
import { type } from 'os'
import React, { useState } from 'react'
import { useFormStatus } from 'react-dom'
import TextInput from './TextInput'
import { Spinner } from '.'
import { useObjectState } from '@/libs/Hooks'
import { error } from 'console';

type formControlsType={
    errorInputs:string[],
    errorMsg:string,
    clearErrors:()=>void,
    goodMsg:string,
}|undefined

type formProps={
    gap?:number
    className?:string,
    error?:string,
    submitText?:string;
    heading?:string|null,
    children?:React.ReactNode
    inputsArray:formInput[],
    submitAction:(formData:FormData)=>any
}&formControlsType

type FormChildrenProps={
    gap?:number,
    errorCheck:(name:string)=>boolean;
    submitText?:string;
    onChange:(name:string,value:any)=>void;
    inputsArray:formInput[]
}

const FormChildren=({
    gap,
    submitText,
    inputsArray,
    errorCheck,
    onChange ,
}:FormChildrenProps)=>{
    const {pending}=useFormStatus()
    return(
        <>
            <div 
                style={{gap:gap+"rem"}} 
                className="centered flex-col  px-8"
            >
            {inputsArray.map(input=>
                <TextInput 
                    key={input.name} 
                    onChange={(value)=>onChange(input.name,value)} 
                    error={errorCheck(input.name)} 
                    disabled={pending} {...input}
                />
            )}
            </div>
           {submitText&&
                <button 
                    type='submit' 
                    onClick={()=>onChange("submit",true)} 
                    disabled={pending} 
                    className={`${pending&&"animate-pulse pt-8"} accent-button`}
                >
                    {<span className=''>{pending?<Spinner/>:submitText}</span>}
                </button>
            }

        </>
    )
}

export const useForm=()=>{
    const [msg,setMsg]=useObjectState({error:"",good:""})

    const [errorInputs,setErroredInputs] = useState<string[]>([])
    const setErrorMsg=(tex:string)=>setMsg({error:tex})
    const setGoodMsg=(tex:string)=>setMsg({good:tex})
    const setErrored=(inputNames:string[])=>setErroredInputs(prevEI=>(
        [
            ...prevEI,
            ...inputNames
        ]
    ))
    const clearErrors=()=>{
        setErrorMsg("")
        setErroredInputs([])
    }

    const controls = {errorInputs,errorMsg:msg.error,goodMsg:msg.good,clearErrors}
    return {setGoodMsg,setErrorMsg,setErrored,clearErrors, controls,}
}

function Form({
    className="",
    gap=.1,
    children,
    heading, 
    submitText,
    errorMsg="",
    goodMsg,
    inputsArray,
    errorInputs=[],
    submitAction,
    clearErrors=()=>{}
}:formProps){
    const isErr=(inputName:string)=>errorInputs.includes(inputName)

    const onFormValueChanged=(name:string,value:string)=>{
        if(isErr(name)||name==='submit'){
            clearErrors()
        }
    }
        
     const action=async(formData:FormData)=>{
        clearErrors()
        await submitAction(formData)
     }
  return (
    <form action={action} className={'w-full mt-40 container pb-8 '+className}>
            {heading&&<h1 className=' text-center mx-auto text-2xl font-bold'>
                {heading}
            </h1>}
            {goodMsg&&<p className=' mb-1 text-center bg-green-100 rounded-2xl text-green-900 py-5'>{goodMsg}</p>}
            {errorMsg&&<p className=' text-center bg-red-100 rounded-2xl text-red-900 py-5'>{errorMsg}</p>}
            <FormChildren 
                gap={gap}
                errorCheck={isErr} 
                onChange={onFormValueChanged} 
                inputsArray={inputsArray!} 
                submitText={submitText}
            />
        {children}
    </form>
  )
}

export default Form
