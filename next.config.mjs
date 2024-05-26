/** @type {import('next').NextConfig} */
const nextConfig = {
        images:{
               remotePatterns:[
                { 
                        hostname:"res.cloudinary.com",
                        protocol:"http",
                        pathname:`/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/**`
                },
                { 
                        hostname:"res.cloudinary.com",
                        protocol:"https",
                        pathname:`/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/**`
                }       
               ]
        },
    
        experimental:{
                serverActions:{
                        bodySizeLimit:'4mb'
                }
        }

};

export default nextConfig;
