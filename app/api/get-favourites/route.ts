import { auth } from '@/auth';
import { getFavourites, getFoods } from '@/utils/db';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
    
    try {
        const session=await auth()
        if(!session?.user?.id)
            throw new Error("Not signed in")
        const favourites = await getFavourites(session.user.id)
        return NextResponse.json({ favourites }, { status: 200 });
    }catch(e){
        console.log(e)
        return NextResponse.json({ e }, { status: 400 });
    }
   
}