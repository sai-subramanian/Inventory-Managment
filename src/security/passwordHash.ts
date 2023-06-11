import * as bcrypt from "bcrypt";

export class passwordHash {
    /**
     * 
     * @param plainpassword 
     * @returns hashed password
     */
    public static async comppassword(plainpassowrd:string,hashedpassword:string){
       return bcrypt.compare(plainpassowrd,hashedpassword);
    }

    public static async hashPassword(plainpassword:string){
        const salt  =  await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(plainpassword,salt);
        
        return hashedpassword;
    }
}