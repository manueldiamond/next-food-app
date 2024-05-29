import { getFoods } from '@/utils/db';
import { NextResponse } from 'next/server';
 
export const revalidate = 25;

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get('id') as string
    const filters = searchParams.get('filters') as string
    try {
        const foods = await getFoods(id,{category:filters})
        // console.log(foods)
        return NextResponse.json({ foods }, { status: 200 });
    }catch(e){
        return NextResponse.json({ e }, { status: 400 });
    }
   
}