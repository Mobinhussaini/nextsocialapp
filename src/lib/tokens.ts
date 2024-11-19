
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import crypto from 'crypto';


export const generateTwoFactorToken  = async (email: string)=> {

    const token = crypto.randomInt(100000, 999999).toString(); 
    const expires = new Date(new Date().getTime() + 1800 * 1000); 

    
    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email, 
            token, 
            expires, 
        }
    })

    return twoFactorToken; 
    
}


export const generateVerificationToken = async (email: string) => {
  
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 1800 * 1000);

    const verificationToken = await db.verificationToken.create({
        data:{
            email, 
            token, 
            expires,
        }
    })
    
    return verificationToken; 

};
