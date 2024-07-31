import NextAuth ,{type DefaultSession} from 'next-auth';
import Github from "next-auth/providers/github";
import authConfig from './auth.config';
import { db } from './lib/db';
import {PrismaAdapter} from "@auth/prisma-adapter";
import { getUserByID } from './data/user';


export const{
    handlers:{GET,POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages:{
        signIn:'/auth/signin',
        error:"/auth/error",
    },
    events:{
        async linkAccount({user}){
            await db.user.update({
                where:{id:user.id},
                data:{emailVerified:new Date()}
            })
        }

    },
    callbacks:{
        /*To Block Someone : 
        async signIn({user}){
        const existingUser = await getUserByID(user?.id || '');
        if(!existingUser || existingUser.emailVerified){
        return false;}
        return true;}
        */ 
        async signIn({user,account}){
            if(account?.providers !== "Credentials"){
                return true;
            }
            const existingUser = await getUserByID(user?.id || '');
            if(!existingUser?.emailVerified) return false;

            return true;
        }, 
        async session({token,session}){
            console.log({
                sessionToken:token,
            })
            if(token.sub && session.user){
                session.user.id = token.sub;
            }
            if (token.role && session.user){
                session.user.role = token.role as "ADMIN"|"USER" ;
            }
            return session;
        },
        async jwt({token}){
            if(!token.sub) return token;
            const existingUser = await getUserByID(token.sub);
            if(!existingUser) return token;
            token.role = existingUser.role ; 
            return token;
        }
    },
    adapter:PrismaAdapter(db),
    session:{strategy:'jwt'},
    ...authConfig,
});