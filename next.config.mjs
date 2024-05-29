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
        async rewrites() {
                return [
                  {
                    source: '/api/:path*',
                    destination: 'https://api.paystack.co/:path*',
                  },
                ]
              },
        
        experimental:{
                serverActions:{
                        bodySizeLimit:'4mb'
                }
        }

};

export default nextConfig;
