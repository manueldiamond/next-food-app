import { ProductHeaderControls } from '@/components';
import Image from 'next/image';
import React from 'react'
import { SessionProvider } from 'next-auth/react';

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
    <SessionProvider>
        <ProductHeaderControls/>
        <div className=''>
          {children}
        </div>
    </SessionProvider>
    );
  }
