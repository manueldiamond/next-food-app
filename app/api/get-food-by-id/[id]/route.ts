import { getFoodById } from "@/utils/db";
import { NextResponse } from "next/server";

export const revalidate = 25;

export async function GET (req:Request,{params}:{params:{id:string}}) {
    const {id}=params
    if(!id){
        console.log("ERROR ID",id)
        const e = new Error("Product is non Existent")
        return NextResponse.json({e:""},{status:500})
    }
    try{
        const data=await getFoodById(id)

        return NextResponse.json({data},{status:200})
    }catch(e){
        return NextResponse.json({e},{status:400})
    }
}