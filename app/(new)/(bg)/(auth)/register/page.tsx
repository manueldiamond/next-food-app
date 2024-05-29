"use client"
import { googleSignIn, register, tryLoginEmail } from '@/actions/loginActions';
import Form, { useForm } from '@/components/Form';
import TextLogo from '@/components/TextLogo';
import { useAuthContext } from '@/libs/context/authContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useReducer, useState } from 'react';


const registerInputs = ([
    {
        label: "Full Name",
        type: "text",
        name: "fullname",
        required:true,

    },
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

    },
    {
        label: "Confirm password",
        type: "password",
        name: "confirm password",
        required:true,

    },
   
]);



const page = ({params}:{params:Record<string,string>}) => {
    const router = useRouter()
    const {callbackUrl}=params
    const {setErrorMsg,setGoodMsg,setErrored,clearErrors,controls:formControls} = useForm()
    
    const handleSubmit=async(formData:FormData)=>{
 
        clearErrors()
        
        const response = await register(formData,callbackUrl)
        if(response.ok){
            setGoodMsg(response.message!)
            setTimeout(()=>
                router.replace("/login?callbackUrl="+callbackUrl)
            ,2000)
            // router.replace("/"+callbackUrl!=='undefined'?callbackUrl:"");

            return; 
        }else if(response.message){
            setErrorMsg(response.message)
            if (response.errInputs)
              setErrored(response.errInputs)
            if (response.redirect)
                router.replace("/login?callbackUrl="+callbackUrl)
                // setTimeout(redirectToLogin,2000)
            return;
        }

        setErrorMsg("Something went wrong, Please try again later")
    }
    
    const onGoogleSignin=async()=>{
       await googleSignIn()
    }
    
  return (
    <>
        <Form 
            heading="Register your new Account"
            submitText="Register"
            inputsArray={registerInputs}
            submitAction={handleSubmit}
            {...formControls}
        >
            <p className='text-sm pt-2 text-gray-3 text-center'>
                <span>Already have an Account?</span>
                <Link 
                    href="/login" 
                    className='cursor-pointer text-accent hover:underline' 
                    >
                    Sign-in
                </Link>
            </p>
        </Form>
    </>
  )
}

export default page
