import { ProductHeaderControls } from '@/app/componenets';
import React from 'react'

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
    <div>
        <ProductHeaderControls/>
        {children}
    </div>
    );
  }
