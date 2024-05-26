import { quickUpload } from '@/libs/cloudinary';
import { NextResponse } from 'next/server';
import { error } from 'console';
 
export async function POST(request: Request) {
    
    try {
        const {buffer} = await request.json()
        // console.log("inflating")
        // const buffer=pako.inflate(compressed,{to:"string"})
        // console.log("inflatED")

        const {error,result} = await quickUpload(buffer)
        console.log("C",error,result)

        if (error)
            throw new Error("Error uploading file")
        
        console.log("upoad..ED",result?.secure_url)

        return NextResponse.json({ url:result!.secure_url! }, { status: 200 });
    }catch(e){
        if(e instanceof Error)
            console.log(e.message)
        return NextResponse.json({ e }, { status: 400 });
    }
   
}