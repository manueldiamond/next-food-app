import React from 'react';

const Spinner = ({className="",buffering=false}) => {
  return (
    <div className={className+" flex justify-center items-center color-white "}>
      {/* <div className="animate-spin  rounded-full  flex min-w-7  aspect-square border-t-4 border-r-4 border-current"></div> */}
      {buffering?
      <span className="icon-[svg-spinners--bars-scale-fade]"/>
      :<span className='icon-[svg-spinners--ring-resize]'/>}
    </div>
  );
};

export default Spinner;
