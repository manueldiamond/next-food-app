"use client"
import { formInput } from '@/libs/types'
import React, { ForwardedRef, MutableRefObject, ReactNode, forwardRef ,useCallback,useMemo,useRef,useState } from 'react'
import { useFormStatus } from 'react-dom'
import TextInput from './TextInput'
import { Spinner } from '.'
import { useObjectState } from '@/libs/Hooks'

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
    children?:ReactNode
}

const FormChildren=({
    gap,
    submitText,
    inputsArray,
    errorCheck,
    onChange ,
    children
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
            {children}
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
    const formref = useRef<HTMLFormElement>(null)
    const onFormValueChanged=(name:string,value:string)=>{
        if(isErr(name)||name==='submit'){
            clearErrors()
        }
    }
     
     const action=async(formData:FormData)=>{
        clearErrors()
        const r =  await submitAction(formData)
        if (typeof r === 'boolean' && r){
            formref.current?.reset()
            // formref.current?.
        }
     }
  return (
    <form ref={formref} action={action} className={'w-full mt-40 container pb-8 '+className}>
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
            >
                {children}
            </FormChildren>

    </form>
  )
}

export default Form
type formPropsWithoutContols={
    gap?:number
    className?:string,
    error?:string,
    submitText?:string;
    heading?:string|null,
    children?:React.ReactNode
    inputsArray:formInput[],
    submitAction:(formData:FormData)=>any
}
const usedForm=(props:formPropsWithoutContols,ref:any)=>{
    const useFormControls = useForm()
    if(ref) 
        ref.current=useFormControls
    return(
        <Form {...props}  {...useFormControls.controls}/>
    )
   
}
export const RefForm = forwardRef(usedForm)

export const useFormRef=(props:formPropsWithoutContols,deps:any[]=[])=>{
    const ref = useRef<ReturnType<typeof useForm>>(null)
    const refForm = useCallback(({children}:{children?:ReactNode})=>(<RefForm ref={ref} {...props} children={children} />) ,[ref,...deps])

    return {ref,refForm}
}
