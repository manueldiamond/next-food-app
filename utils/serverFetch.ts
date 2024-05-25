
export const sfetch=(url: string, init?: RequestInit | undefined)=>
    fetch(`${process.env.NODE_ENV==="production"?process.env.PROD_URL:process.env.DEV_URL}${url}`,{next:{revalidate:process.env.NODE_ENV==="development"?5:600,...init?.next} ,...init})