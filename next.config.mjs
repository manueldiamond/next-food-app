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
        // I saw this online on stack... 
        async rewrites() {
                return [
                  {
                    source: '/api/:path*',
                    destination: 'https://api.paystack.co/:path*',
                  },
                ]
              },
        // I'm thinking it should look like this:       
        headers:[
                {
                 // 
                 // source:
                 // some headers congig shii..
                }
        ] ,

        experimental:{
                serverActions:{
                        bodySizeLimit:'4mb'
                }
        }

};

export default nextConfig;
