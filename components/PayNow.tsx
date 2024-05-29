"use client"
import { Session, User } from 'next-auth'
import { useRouter } from 'next/navigation'
import { MutableRefObject, forwardRef, useRef, useState } from 'react'
import { usePaystackPayment } from 'react-paystack'
import { HookConfig } from 'react-paystack/dist/types'

type payNowProps={
    user:User,
    amount:number
}


const usePay=(name:string,email:string,amount:number,onClose?:(()=>void),onSuccess?:(()=>void))=>{
  const spaceIndex=name.indexOf(" ")
  const firstname = name.slice(0,spaceIndex&&spaceIndex)
  const lastname = name.slice(spaceIndex&&spaceIndex)
  const usePaystackCongig:HookConfig =  {firstname,lastname,currency:"GHS",email,publicKey:process.env.NEXT_PUBLIC_PAYSTACK_TEST_KEY!,amount}
  // console.log(usePaystackCongig)
  const initialize = usePaystackPayment(usePaystackCongig)
  // const [success,useState,]
  const pay=()=>{
    initialize({onClose,onSuccess})
  }
  return pay
}

//this is a hacky solution just so i get it done fast.. 
//I'll probably use a hook that makes look better later
const useModal=()=>{
  const [open,setOpen]=useState(false)

  return({
    open:()=>{setOpen(true)},
    close:()=>{setOpen(false)},
    visible:open
  })
}
const SuccessModal=({ 
  open=()=>{ },
  close=()=>{ },
  visible=false,
})=>{
  const router=useRouter()
  return(
    visible?
    <div className='z-50 fixed top-0 left-0 centered w-full h-full'>
      <div className=' z-10 max-w-[22rem] centered flex-col rounded-20 px-16 py-8 bg-white shadow-2xl scale-up-animation'>
        <div style={{animationDelay:".15s"}} className='scale-up-animation bg-accent rounded-full text-white p-[1.05rem] size-[90px] aspect-square '>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={6} stroke="currentColor" className="flex flex-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div> 
        <h1 className='text-accent pt-5 text-3xl'>Success !</h1>
        <p className='max-w-[12.5rem] text-center text-gray-3 pt-5 py-8 text-sm'>Your payment was successful.<br/> A receipt for this purchase has been sent to your email.</p>
        <button onClick={()=>{close();}} className=' text-lg accent-button w-full !border-none'>Go back</button>
      </div>
      <div className='opacity-0 z-0 bg-black/10 scale-150 left-0 top-0 animate-opacity fixed w-screen h-screen backdrop-blur-lg'/>
    </div>
    :<></>
  )
}


const PayNow = ({user,amount}:payNowProps) => {
  const {email,name} = user
  const modalControls=useModal()
  
  const paymentSuccess=()=>modalControls.open()
  const paymentCancelled=()=>modalControls.open()//DebugTesting

  const pay = usePay(name!,email!,amount,paymentCancelled,paymentSuccess)
  return (
    <div className='flex justify-between items-center'>
      <SuccessModal {...modalControls} />

        <div>
            <p className='text-base text-gray-3'>Total price</p>
            <p className='text-black font-semibold text-[2rem]'>GH₵ {amount}</p>
        </div>
        <button onClick={pay} className='dark-button  max-w-[13.0625rem] min-h-[4.375rem]'>Pay Now</button>
    </div>
  )
}

export default PayNow