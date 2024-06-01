import { HeaderControls } from '@/components';
import Image from 'next/image';
import React from 'react'

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
    <div>
        <div className=' fixed w-screen h-screen top-0 left-0 -z-10 bg-accent-gradient '>
        <Image
          className='absolute select-none left-0 -top-4 mix-blend-overlay opacity-50'
          src={"/more-ham.png"}
          width={196}
          height={196}
          alt='ham'
        />
        <Image
          className='absolute select-none right-[-96px] top-[25px] mix-blend-overlay opacity-50'
          src={"/more-ham.png"}
          width={196}
          height={196}
          alt='ham'
        />
      </div>
        <div className=' md:max-w-[600px] md:mx-auto -ml-1 mb-2 w-full bg-white rounded-[35px] mt-[100px] relative centered flex-col'>
          {children}
        </div>
    </div>
    );
  }
