import { HeaderControls } from '@/components';
import Image from 'next/image';
import React from 'react'
import { SessionProvider } from 'next-auth/react';

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
    <div className='min-h-screen flex flex-col'>
      <SessionProvider>
        <HeaderControls/>
          {children}
     </SessionProvider>
    </div>
    );
  }
