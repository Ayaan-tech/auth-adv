"use server";
import * as z from 'zod';
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from '@/route';
import { AuthError } from 'next-auth';
import { generateVerificationtoken } from '@/lib/tokens';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(values);
    if (!validateFields.success) {
        return { error: "Invalid fields!" };
    }
    const { email, password } = validateFields.data;
    const existingUser = await getUserByEmail(email);
    if(!existingUser || !existingUser.email || !existingUser.password ){
        return{
            error :"Email doesn't exist !"
        }
        
    }
    if(existingUser.emailVerified){
        const verificationToken = await generateVerificationtoken(existingUser.email);
        await sendVerificationEmail(verificationToken.email,verificationToken.token);

        return {success :"Confirmation Email Sent!"};
    }
    
    try {
        await signIn("credentials", { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT });
        return { success: "Login successful" }; // Added success message
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials" };
                default:
                    return { error: "Something went wrong!" };
            }
        }
        throw error;
    }
};
