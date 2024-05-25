import { quickUpload } from '@/libs/cloudinary';
import { NextResponse } from 'next/server';
import pako from 'pako';
import { error } from 'console';
 
export async function POST(request: Request) {
    
    try {
        const {buffer:compressed} = await request.json()
        const buffer=pako.inflate(compressed,{to:"string"})
        const {error,result} = await quickUpload(buffer)
        if (error)
            throw new Error("Error uploading file")
        return NextResponse.json({ url:result?.url }, { status: 200 });
    }catch(e){
        if(e instanceof Error)
            console.log(e.message)
        return NextResponse.json({ e }, { status: 400 });
    }
   
}