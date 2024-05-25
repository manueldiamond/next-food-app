"use client"
import { googleSignIn, tryLoginEmail } from '@/actions/loginActions';
import Form, { useForm } from '@/components/Form';
import TextLogo from '@/components/TextLogo';
import { useAuthContext } from '@/libs/context/authContext';
import Link from 'next/link';
import { useState } from 'react';

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



const page = ({params}:{params:Record<string,string>}) => {
    const {callbackUr}=params
    const {login,logout} = useAuthContext()
    const {setErrorMsg,setErrored,clearErrors,controls:formControls} = useForm()
    
    const handleSubmit=async(formData:FormData)=>{
 
        clearErrors()

        // these are in both of them.
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        
        const response = await tryLoginEmail(email,password,callbackUr)
        
        if (response){
            if(response.ok) {
               return;
            }else{
                setErrorMsg(response.message!)
                if(response.errInputs)
                 setErrored(response.errInputs)
            }
            return;
        }
        

        setErrorMsg("Something went wrong, Please try again later")
        logout!()
    }
    
  
  return (
    <>
        <Form 
            heading={"Sign in to continue"}
            submitText={"Login"}
            submitAction={handleSubmit}
            inputsArray={loginInputs}
            // {...formControls}
        >
            <p className='text-sm pt-2 text-gray-3 text-center'>
                <span>Don't have an Account? </span>
                <Link 
                    href="/register" 
                    className='cursor-pointer text-accent hover:underline' 
                >
                    Sign-up
                </Link>
            </p>
        </Form>
    </>
  )
}

export default page
