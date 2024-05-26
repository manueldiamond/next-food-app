import React from 'react'

const ErrorText = ({red=false, text="Error, couldn't load data"}) => {
  return (
    <><p className={`text-sm py-20 ${red?"text-red-400":"text-gray-3"}`}> ⚠️ {text} </p></>
  )
}

export default ErrorText