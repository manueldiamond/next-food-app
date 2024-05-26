import NextAuth, { User } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./libs/zod"
import { getUserFromDb } from "./utils/db"
import { isPasswordValid } from "./utils/passworder"
import { LoginError } from './libs/types';
import { authConfig } from './auth.config';



export const { signIn, signOut, auth, handlers:{GET,POST}, unstable_update:update } = NextAuth({
    ...authConfig,
  providers: [
    Google({
     clientId: process.env.AUTH_GOOGLE_ID, 
     clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
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

                console.log(user)
                const auth_user = {id:user.id, name:user.name, image:user.profileimage, email }
                return auth_user
          },
    }),
    
    ],
    callbacks: {
        async jwt({ token, user, account, profile,trigger,session }: any) {
          // Persist the OAuth access_token and or the user id to the token right after signin
          
          console.log("pre=token", token);
          
          if(user){
            token.user=user
            token.name=user.name
          }
          if (account) {
            token.accessToken = account.access_token;
            token.account = account
          }

          console.log("post-token",token)
           // ***************************************************************
          // added code
          if (trigger === "update" && session) 
            token = {...token, user : session.user}

          return token;
        },
        async session({ session, token, user , trigger, newSession}: any) {
          // Send properties to the client, like an access_token and user id from a provider.
          
          console.log("pre-session",session)
          if (token) {
            session.accessToken = token.accessToken;
            if(token.user)
              session.user=token.user
          }
          console.log("post-session",session)
          if (trigger==="update"){
              console.log("UPDAFE",session)
          }

          return session;
        },
      },

})