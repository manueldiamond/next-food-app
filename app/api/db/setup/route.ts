import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
    try {
        //const {query}=await (request.json())
        const result =0
        //await sql`${query}`;
        // `
        //     CREATE TABLE User (
        //          Name varchar(255) not null,
        //          email varchar(255) not null unique,
        //          password varchar not null );`;
        
        
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

}