import React from 'react'

const name=["Tasty","Chef"]


const TextLogo = ({className="",fancy=false}) => {
  return fancy?(
    <div className={'select-none logo relative font-lobster'}>
      <div className=' text-white font-[400] text-[40px]'>{name[0]}</div>
      <div className='mt-[-20px] ml-[70px] text-[#3C2F2F] font-[400] text-[40px]'>{name[1]}</div>
    </div>
  ):(
    <div className={`${className} logo font-lobster text-[45px]`}>
        <span className='text-accent first'>{name[0]}</span>
        <span className='text-black second'>{name[1]}</span>
    </div>
  )
}

export default TextLogo