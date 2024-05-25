import NextAuth, { User } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./libs/zod"
import bcrypt from 'bcryptjs'
import { getUserFromDb } from "./utils/db"
import { isPasswordValid } from "./utils/passworder"
import { userType, LoginError } from './libs/types';
import { ZodError } from "zod"
import { redirect } from "next/navigation"
import { isRedirectError } from "next/dist/client/components/redirect"
import { error } from 'console';
import { authConfig } from './auth.config';



export const { signIn, signOut, auth, handlers:{GET,POST}, unstable_update:update } = NextAuth({
    ...authConfig,
  providers: [
    Google({
     clientId: process.env.AUTH_GOOGLE_ID, 
     clientSecret: process.env.AUTH_GOOGLE_SECRET }),
    Credentials({
        credentials: {
            email: {},
            password: {},
          },
          authorize: async (credentials) => {

                let user = null
                // return {id:1,name:"b"};                
                const { email, password } = await signInSchema.parseAsync(credentials)
                
                console.log("zod validated\nfetching user...")
                
                user = await getUserFromDb(email)
                
                if (!user)
                    throw new LoginError("Invalid Email")
            
                console.log("obtained user, "+user.id,"\n validating passwords")

                
                if(!await isPasswordValid(password,user.pass))
                    throw new LoginError("Invalid Password")

                console.log("Password valid logging in for "+user.name)
                const auth_user:User = {id:user.id, name:user.name, image:user.profileImage as string, email }
                return auth_user
          },
    }),
    
    ],
    callbacks: {
        // async jwt({ token, account, profile,trigger,session }: any) {
        //   // Persist the OAuth access_token and or the user id to the token right after signin
        //   if (account) {
        //     console.log("token", token);
        //     token.accessToken = account.access_token;
        //     token.id = token.sub
        //   }
        //   console.log(token)
        //    // ***************************************************************
        //   // added code
        //   if (trigger === "update" && session) {
        //     token = {...token, user : session}
        //     return token;
        //   };
        //   return token;
        // },
        async session({ session, token, user , trigger, newSession}: any) {
          // Send properties to the client, like an access_token and user id from a provider.
          
          if (token) {
            session.accessToken = token.accessToken;
            if(token.user)
              session.user=token.user as User
            else
              session.user={...session.user,id:token.sub,image:token.picture}
          }

          if (trigger==="update"){
            console.log("UPDATE",user,token,session,newSession)
          }

          return session;
        },
      },

})