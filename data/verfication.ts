import {db} from "@/lib/db";
export const getVerficationTokenByEmail = async(email:string) =>{
    try {
        const verificationToken= await db.verificationToken.findFirst({
            where :{email :email}
        });
        return verificationToken;
    } catch  {
        return null;
        
    }
}
export const getVerficationTokenByToken = async(token:string) =>{
    try {
        const verificationToken= await db.verificationToken.findUnique({
            where :{token :token}
        });
        return verificationToken
        
    } catch  {
        return null;
        
    }
}