import {db} from "@/lib/db";
import { string } from "zod";
export const getUserByEmail = async (email:string) =>{
    try {
        const user = await db.user.findUnique({
            where:{
                email:email
            }
        });
        return user;
    } catch {
        return null;
    }

}
export const getUserByID= async (id:string) =>{
    try {
        const user = await db.user.findUnique({
            where:{
                id:id
            }
        });
        return user;
    } catch {
        return null;
    }

}