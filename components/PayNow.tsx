"use client"
import { Session, User } from 'next-auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { config } from 'process'
import { MutableRefObject, forwardRef, useRef, useState } from 'react'
import { PaystackButton, usePaystackPayment } from 'react-paystack'
import { HookConfig, PaystackProps } from 'react-paystack/dist/types'
import { number } from 'zod'

type payNowProps={
    user:User,
  amount:number
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
  text,//unused
  style="ok"//unused for now
}:Partial<{
    open:()=>void,
    close:()=>void,
    visible:boolean,
    text:string,
    style:"ok"|"error"|"!"

}>)=>{
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
        <Link href={"/"} onClick={()=>{close();}} className=' text-lg accent-button w-full !border-none'>Go back</Link>
      </div>
      <div className='opacity-0 z-0 bg-black/10 scale-150 left-0 top-0 animate-opacity fixed w-screen h-screen backdrop-blur-lg'/>
    </div>
    :<></>
  )
}


const PayNow = ({user,amount}:payNowProps) => {
  const {email,name} = user
  const spaceIndex=name!.indexOf(" ")
  const firstname = name!.slice(0,spaceIndex&&spaceIndex)
  const lastname = name!.slice(spaceIndex&&spaceIndex)
  
  const modalControls=useModal()

  const amountInPesewas=Math.ceil(amount*100)
  
  const paymentSuccess=()=>modalControls.open()//....
  const paymentCancelled=()=>modalControls.open()//I know, same logic for both...- ITS FOR SCIENCE!!

  return (
    <div className='flex justify-between items-center'>
      {/* <PaystackButton {...componentProps}/> */}
      
      <SuccessModal {...modalControls} />

        <div>
            <p className='text-base text-gray-3'>Total price</p>
            <p className='text-black font-semibold text-[2rem]'>GH₵ {amount}</p>
        </div>
        <PaystackButton 
          className='button dark-button   max-w-[13.0625rem] min-h-[4.375rem]'
          text='Pay Now'
          amount={amountInPesewas}
          email={email!}
          currency='GHS'
          publicKey={process.env.NEXT_PUBLIC_PAYSTACK_TEST_KEY!}
          onSuccess={paymentSuccess}
          onClose={paymentCancelled}
          firstname={firstname}
          lastname={lastname}
        />
        
    </div>
  )
}

export default PayNow