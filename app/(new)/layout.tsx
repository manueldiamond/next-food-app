import { ProductHeaderControls } from '@/components';
import Image from 'next/image';
import React from 'react'

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
    <div>
        <ProductHeaderControls/>
        <div className=''>
          {children}
        </div>
    </div>
    );
  }
