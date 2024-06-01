import { auth } from '@/auth';
import { getUserDataById } from '@/utils/db';
import { NextResponse } from 'next/server';

export const fetchCache = "force-no-store";
// export const revalidate = 10
// export const revalidate = 5

export const GET = auth(
  async function GET(request) {
    try {
      const {searchParams} = new URL(request.url)
      const id=request.auth?.user?.id
    
      if(!(id))
          throw new Error("Cannot get session ID")
      
      const data = await getUserDataById(id)
      
      return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
      if(error instanceof Error)
          error=error.message
      return NextResponse.json({ error }, { status: 400 });
    }
  }
)