"use client"
import { tryLogin } from '@/actions/authenticateUser';
import TextInput from '@/componenets/TextInput';
import TextLogo from '@/componenets/TextLogo';
import { useAuthContext } from '@/libs/context/authContext';
import { log } from 'console';
import { register } from 'module';
import { Irish_Grover } from 'next/font/google';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import { useFormStatus } from 'react-dom';

const loginInputs = [
    {
        label: "Email",
        type: "email",
        name: "email",
        required:true,
    },
    {
        label: "Password",
        type: "password",
        name: "password",
        required:true,

    }
];

const registerInputs = loginInputs.concat([
    {
        label: "Full Name",
        type: "text",
        name: "name",
        required:true,

    },
    {
        label: "Confirm password",
        type: "password",
        name: "confirm password",
        required:true,

    },
    
]);

type FormChildrenProps={
    errorCheck:(name:string)=>boolean;
    submitText?:string;
    onChange:(name:string,value:any)=>void;
    inputsArray:{label:string,type:string,name:string}[]
}
const FormChildren=({errorCheck, onChange ,inputsArray,submitText}:FormChildrenProps)=>{
    const {pending}=useFormStatus()
    return(
        <>
            <div className='px-5 pb-8'>
            {inputsArray.map(input=>
                <TextInput key={input.name} onChange={(value)=>onChange(input.name,value)} error={errorCheck(input.name)} disabled={pending} {...input}/>
            )}
           </div>
            <p className='text-sm text-gray-3 text-center'>
                We'll Register you if you don't have an Account
            </p>
           <button type='submit' disabled={pending} className={`${pending&&"animate-pulse"} w-full p-3 click-scale rounded-20 border-solid border-[3px] text-white bg-accent centered gap-5`}>
                {<span className=''>Continue</span>}
            </button>

        </>
    )
}

const page = ({searchParams}:{searchParams:{registering?:boolean}}) => {
    const router = useRouter()
    const registering = searchParams.registering

    const {login,logout} = useAuthContext()

    const [errorMsg,setErrorMsg]=useState("")

    const [errorInputs,setErroredInputs] = useState<string[]>([])
    const setErrored=(inputNames:string[])=>setErroredInputs(prevEI=>(
        [
            ...prevEI,
            ...inputNames
        ]
    ))
    const isErr=(inputName:string)=>errorInputs.includes(inputName)

    const clearErrors=()=>{
        setErrorMsg("")
        setErroredInputs([])
    }
    const onFormValueChanged=(name:string,value:string)=>{
        if(isErr(name)){
          clearErrors()
        }
    }
    
    const handleSubmit=async(formData:FormData)=>{
        
        clearErrors()

        // these are in both of them.
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        if(registering){
            const passwordConfirmation = formData.get('confirm password') as string
            const fullname = formData.get('name') as string

            if (password!==passwordConfirmation){  
                 setErrored(['password','passwordConfirmation']);
                 setErrorMsg("Passwords don't Match")
                 return;
            }

            const response = await tryRegister(email,password,fullname)
            
            if(response.ok){
                router.push('/profile')  // TODO, push to where user navigated from
                login!(response.user)
                return;
            }

            setErrorMsg(response.message!)
            
        }else{
            const response = await tryLogin(email,password)
        
            if (response.ok) {
                login!(response.user)
                router.push('/profile') // TODO, push to where user navigated from
                return;
            } else if(response.register){
                router.push(`/login?registering=true`) 
                return;
            }
            
            setErrorMsg(response.message!)

        }
        logout!()
    }
    
  return (
    <div className=' w-full min-h-full centered flex-col relative'>
        <div className='bg-accent-gradient mx-auto border-4 absolute top-0 translate-y-[-60%] border-white rounded-full aspect-square centered p-8 w-min my-5'>  
            <TextLogo/>
        </div>
        <h1 className='mt-40 text-center mx-auto text-2xl font-bold'>Sign in to continue</h1>
        <form action={handleSubmit} className='w-full container pb-8'>
            <p className=' text-center text-red-900 py-'>{errorMsg}</p>
            <FormChildren onChange={onFormValueChanged} errorCheck={isErr} inputsArray={registering?registerInputs:loginInputs} />
        </form>
    </div>
  )
}

export default page