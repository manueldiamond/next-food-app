import React, { ReactNode } from 'react'
import { error } from 'console';
import loading from '../app/loading';
import { ErrorText, Spinner } from '.';

const LoadingComponent = ({error=undefined,buffering=false,loading,children,Element}:{error?:boolean,loading:boolean,children?:ReactNode,Element?:()=>ReactNode,buffering?:boolean}) => {
  
  return (
    <>
     {loading?<Spinner buffering className="text-gray-3"/>
    :error?<ErrorText/>
    :<>
        {children&&children}
        {Element&&<Element/>}
    </>}
    </>
  )
}

export default LoadingComponent