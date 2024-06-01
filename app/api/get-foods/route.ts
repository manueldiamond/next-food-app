import { auth } from '@/auth';
import { getFoods } from '@/utils/db';
import { NextResponse } from 'next/server';
 
export const revalidate = 300;

export const GET = auth(
        async function GET(request) {
        const {searchParams} = new URL(request.url)
        const id = request.auth?.user?.id
        const filters = searchParams.get('filters') as string
        try {
            const foods = await getFoods(id,{category:filters})
            return NextResponse.json({ foods }, { status: 200 });
        }catch(e){
            return NextResponse.json({ e }, { status: 400 });
        }
    
    }
)