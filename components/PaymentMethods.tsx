"use client"
import { usePaymentMethods } from "@/libs/dataFetches"
import LoadingComponent from "./LoadingComponent"
import { User } from "next-auth"
const PaymentMethods =()=>{
    const {isLoading,error,data:paymentMethods}=usePaymentMethods()
    return(
    <section className='my-5'>
        <h3 className='text-xl py-7 font-semibold text-gray-1'>Payment methods</h3>
        <LoadingComponent loading={isLoading} error={false}>
            <p className=" px-5  italic text-center md:text-base sm:text-sm text-xs text-gray-3">For security reasons, we don't save any payment details</p>
        </LoadingComponent>
        {paymentMethods.length>0&&<></>}
        {/* TODO: show a modal to add new onclick */}
        {/* 
        <button className='add__new   hollow-gray-button mx-auto max-w-[6.25rem] h-[5rem]'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </button>
         <div className='flex gap-1 '>
            <input value={'checked'} type='checkbox'/>
            <label  className='text-gray-3 py-5'>Save details for future payments</label>
        </div>
         */} 
    </section>
    )
}
export default PaymentMethods