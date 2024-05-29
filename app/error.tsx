"use client"

import { ErrorText } from '@/components'
import TextLogo from '@/components/TextLogo'
import Link from 'next/link'
import React from 'react'

const error = ({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) => {
  return (
    <div className='centered flex-col py-20 bg-white'>
        <TextLogo className="opacity-40"/>
        <h1 className='text-xl text-gray-400'>Something Went wrong,</h1>
        <p className='text-center text-gray-200'>We weren't cooking well enough with this one..</p>
        <ErrorText text={error.message}/>
        <button className='!w-min accent-button' onClick={()=>reset()}>Retry</button>
        <Link href={"/"}>
            <p className='mt-3 rounded-20 p-3 px-10 hover:underline text-accent'>Back to Homepage</p>
        </Link>
    </div>
  )
}

export default error