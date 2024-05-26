import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center color-white ">
      <div className="animate-spin rounded-full  flex min-w-7 aspect-square border-t-4 border-b-4 border-current"></div>
    </div>
  );
};

export default Spinner;
