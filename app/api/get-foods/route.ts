import { getFoods } from '@/utils/db';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    try {
        const foods = await getFoods()
        return NextResponse.json({ foods }, { status: 200 });
    }catch(e){
        console.log(e)
        return NextResponse.json({ e }, { status: 400 });
    }
   
}