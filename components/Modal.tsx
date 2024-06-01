import { modalProps } from "@/libs/types";
import React from "react";

const Modal =({
    open=()=>{ },
    close=()=>{ },
    visible=false,
    children,
    className
    }:modalProps)=>{
  

    return(
        visible?
        <div className='z-50 fixed top-0 left-0 centered w-full h-full'>
        <div className={className+' z-10 max-w-[22rem] centered flex-col rounded-20 px-16 py-8 bg-white shadow-2xl scale-up-animation'}>
            {children}
        </div>
        <div className='opacity-0 z-0 bg-black/10 scale-150 left-0 top-0 animate-opacity fixed w-screen h-screen backdrop-blur-lg'/>
        </div>
        :<></>
    )
}
export default Modal