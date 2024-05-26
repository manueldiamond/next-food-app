
export const sfetch=(url: string, init?: RequestInit | undefined)=>
    fetch(`${process.env.NODE_ENV==="production"?process.env.PROD_URL:process.env.DEV_URL}${url}`,{...init,next:{revalidate:1}})