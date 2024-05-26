"use client"
import { formInput } from '@/libs/types'
import { type } from 'os'
import React, { useState } from 'react'
import { useFormStatus } from 'react-dom'
import TextInput from './TextInput'

type formControlsType={
    errorInputs:string[],
    errorMsg:string,
    clearErrors:()=>void
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
                    {<span className=''>{submitText}</span>}
                </button>
            }

        </>
    )
}

export const useForm=()=>{
    const [errorMsg,setErrorMsg]=useState("")
    const [errorInputs,setErroredInputs] = useState<string[]>([])

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

    const controls = {errorInputs,errorMsg,clearErrors}
    return {setErrorMsg,setErrored,clearErrors, controls,}
}

function Form({
    className="",
    gap=.1,
    children,
    heading, 
    submitText,
    errorMsg="",
    inputsArray,
    errorInputs=[],
    submitAction,
    clearErrors=()=>{}
}:formProps){
    const isErr=(inputName:string)=>errorInputs.includes(inputName)

    const onFormValueChanged=(name:string,value:string)=>{
        clearErrors()
        if(isErr(name)){
            
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
            <p className=' text-center text-red-500 py-5'>{errorMsg}</p>
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
