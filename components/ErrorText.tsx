import React from 'react'

const ErrorText = ({red=false, text="Error, couldn't load data"}) => {
  return (
    <div className='flex-1'><p className={`text-center mx-aut text-sm py-20 ${red?"text-red-400":"text-gray-3"}`}> ⚠️ {text} </p></div>
  )
}

export default ErrorText