"use client"
import pako from 'pako';
export const compressBase64String=(base64String:string)=>{
   return pako.deflate(base64String, { level :  9})
}
