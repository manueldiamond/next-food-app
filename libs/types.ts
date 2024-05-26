import { type } from 'os';
import { string } from 'zod';



export type userType = {
    id:string
    profileimage?:string|null
    name:string,
    email:string,
}|null

export type userWithPass=userType&{pass:string}
export type userDataType=userType&{
    deliveryaddress?:string,
    paymentdetails?:any
}
export type authContextType={
    user:userType
    login?:(user:userType)=>void;
    logout?:()=>void,
}


export type FoodType={
    id: string;
    name: string;
    description: string;
    preptime: string | null;
    favourite?:boolean
    img: string;
    rating: number;
    vendor: string | null;
    published: boolean;
    price:number;
}


export type formInput={
    label?:string
    name:string
    type:string
    placeholder?:string,
    required?:boolean,
    disabled?:boolean,
    defaultValue?:any,
}

export class CustomError extends Error{}
export class LoginError extends CustomError{
    // msg:string
    constructor(msg:string){
        super(msg)
    }
}


export class ConnectionError extends CustomError{
    // msg:string
    constructor(){
        super("Connection Error, Please try again later")
    }
}