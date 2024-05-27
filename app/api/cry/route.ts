import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function GET(req:Request) {
    try{
        const {rows} = await sql`select * from users 
                            where email='manueldiamondlistowell@gmail.com'`
        return NextResponse.json(JSON.stringify({dateee:rows[0]}))
    }catch(e){
        return NextResponse.json(JSON.stringify({e:e instanceof Error&&e.message}))
    }
    
}