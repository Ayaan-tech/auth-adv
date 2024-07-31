import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import credentials from "next-auth/providers/credentials";
import authconfig from "./auth.config";
import {getUserByEmail} from "@/data/user"
import {LoginSchema} from "@/schemas";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
export default{
    providers:[
        
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        credentials({
            async authorize(credentials){
                const validateFields = LoginSchema.safeParse(credentials);
                if(validateFields.success){
                    const {email,password} = validateFields.data;
                    const user = await getUserByEmail(email);
                    if(!user || !user.password){
                        return null;
                    }
                    const PasswordsMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );
                    if(PasswordsMatch){
                        return user;
                    }
                }
                return null;
            }

        })
    ],
} satisfies NextAuthConfig