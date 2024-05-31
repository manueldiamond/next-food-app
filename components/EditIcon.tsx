import Link from 'next/link'
import React from 'react'

const EditIcon = ({id=""}) => {
  return (
    <Link href={"/products/edit/"+id} className='!absolute button !border-white !border-4 translate-x-1/2 translate-y-1 text-white bg-black/30 p-2 aspect-square w-min right-1/2 bottom-0 rounded-full'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
        </svg>
    </Link>
  )
}

export default EditIcon