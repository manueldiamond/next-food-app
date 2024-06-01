import React from 'react';

const Spinner = ({className="",buffering=false}) => {
  return (
    <div className={className+" flex justify-center items-center color-white "}>
      {/* <div className="animate-spin  rounded-full  flex min-w-7  aspect-square border-t-4 border-r-4 border-current"></div> */}
      {buffering?
        <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
        <defs>
          <filter id="svgSpinnersGooeyBalls10">
            <feGaussianBlur in="SourceGraphic" result="y" stdDeviation={1.5}></feGaussianBlur>
            <feColorMatrix in="y" result="z" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"></feColorMatrix>
            <feBlend in="SourceGraphic" in2="z"></feBlend>
          </filter>
        </defs>
        <g fill="currentColor" filter="url(#svgSpinnersGooeyBalls10)">
          <circle cx={4} cy={12} r={3}>
            <animate attributeName="cx" calcMode="spline" dur="0.75s" keySplines=".56,.52,.17,.98;.56,.52,.17,.98" repeatCount="indefinite" values="4;9;4"></animate>
            <animate attributeName="r" calcMode="spline" dur="0.75s" keySplines=".56,.52,.17,.98;.56,.52,.17,.98" repeatCount="indefinite" values="3;8;3"></animate>
          </circle>
          <circle cx={15} cy={12} r={8}>
            <animate attributeName="cx" calcMode="spline" dur="0.75s" keySplines=".56,.52,.17,.98;.56,.52,.17,.98" repeatCount="indefinite" values="15;20;15"></animate>
            <animate attributeName="r" calcMode="spline" dur="0.75s" keySplines=".56,.52,.17,.98;.56,.52,.17,.98" repeatCount="indefinite" values="8;3;8"></animate>
          </circle>
        </g>
      </svg>
      :
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <g stroke="currentColor">
        <circle cx={12} cy={12} r={9.5} fill="none" strokeLinecap="round" strokeWidth={3}>
          <animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150"></animate>
          <animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59"></animate>
        </circle>
        <animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform>
      </g>
    </svg>}
      
    </div>
  );
};

export default Spinner;
