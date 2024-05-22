"use client"

import { Dispatch } from '@reduxjs/toolkit'
import { ReactNode, createContext, useContext, useState } from 'react'

export type userType={
    id:string
    profileImage?:string|null
    name:string
}|null

export type authContextType={
    user:userType
    login?:(user:userType)=>void;
    logout?:()=>void,
}


const defaultContext={
    user:null
}

export const AuthContext = createContext<authContextType>(defaultContext)

export const AuthProvider=({children}:{children:ReactNode})=>{
    const [user,setAuth]=useState(null)
    const login=(user:userType)=>setAuth(null)
    const logout=()=>{
        setAuth(null)
    }
    const authValue:authContextType={user,login,logout}
    
    return(
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext=()=>useContext(AuthContext)


