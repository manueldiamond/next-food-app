import React, { ReactNode } from 'react'
import { error } from 'console';
import loading from '../app/loading';
import { ErrorText, Spinner } from '.';

type loadingComponentProps={
  error?:boolean,
  loading:boolean,
  children?:ReactNode,
  Element?:()=>ReactNode,
  roller?:boolean
}
const LoadingComponent = ({error=undefined,roller=false,loading,children,Element}:loadingComponentProps) => {
  
  return (
    <>
     {loading?<Spinner buffering={!roller} className="text-gray-3"/>
    :error?<ErrorText/>
    :<>
        {children&&children}
        {Element&&<Element/>}
    </>}
    </>
  )
}

export default LoadingComponent