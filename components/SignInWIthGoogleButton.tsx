
"use client"
import { googleSignIn } from '@/actions/loginActions'
import React from 'react'

const SignInWIthGoogleButton = () => {
    
    const onGoogleSignin=async()=>{
        await googleSignIn()
    }
     
  return (
    <button onClick={onGoogleSignin} className='hollow-accent-button'>Sign in with Google</button>
  )
}

export default SignInWIthGoogleButton