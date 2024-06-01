import { modalProps } from "@/libs/types";
import Modal from "./Modal";


type messageModalProps=modalProps&{
    headingStyle?: string;
    iconStyle?: string;
    buttonStyle?:string;
    buttonText?: string;
    bodyText?: string;
    heading?: string;
    onButtonClicked?: () => void;
    close?: () => void;
    children?: React.ReactNode;
}
export default function MessageModal({
    headingStyle="", 
    iconStyle="", 
    buttonStyle="",
    buttonText="Go back", 
    bodyText ,
    heading="Success !", 
    onButtonClicked ,
    close, 
    visible,
    children
}:messageModalProps){

    return(
        <Modal visible={visible}>
            <div style={{animationDelay:".15s"}} className={iconStyle+' scale-up-animation bg-accent rounded-full text-white p-[1.05rem] size-[90px] aspect-square '}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={6} stroke="currentColor" className="flex flex-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            </div> 
            {heading&&<h1 className={headingStyle+' text-accent pt-5 text-3xl'}>{heading}</h1>}
            {bodyText&& <p className='max-w-[12.5rem] text-center text-gray-3 pt-5 py-8 text-sm'>{bodyText}</p>}
            {children}
                {buttonText&&<button onClick={onButtonClicked} className={buttonStyle+' text-lg bg-accent w-full'}>{buttonText}</button>}
        </Modal>
    )
}