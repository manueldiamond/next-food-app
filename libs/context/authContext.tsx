"use client"

import { Dispatch } from '@reduxjs/toolkit'
import { ReactNode, createContext, useContext, useState } from 'react'
import { authContextType, userType } from '../types'

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


