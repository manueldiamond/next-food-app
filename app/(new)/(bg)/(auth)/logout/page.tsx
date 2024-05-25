import { logout } from '@/actions/loginActions'
import React from 'react'

const page = async() => {
    await logout()
  return (
    <div className='text-3xl text-center mx-auto py-10'>Logging Out</div>
  )
}

export default page