import React from 'react'

const TextLogo = ({className="",fancy=false}) => {
  return fancy?(
    <div className={'select-none logo relative font-lobster'}>
      <div className=' text-white font-[400] text-[40px]'>Tasty</div>
      <div className='mt-[-20px] ml-[70px] text-[#3C2F2F] font-[400] text-[40px]'>chef</div>
    </div>
  ):(
    <div className={`${className} logo font-lobster text-[45px]`}>
        <span className='text-accent first'>tasty</span>
        <span className='text-black second'>chef</span>
    </div>
  )
}

export default TextLogo