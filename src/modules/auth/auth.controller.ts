import { Request,Response } from "express";
import { authService } from "./auth.service";
import { success } from "zod";

export const authController= {
    async registerController(req:Request,res:Response){
        try{
            const user = await authService.registerUser(req.body);
            return res.status(200).json({
                success: true,
                message: "User Created Successfully",
                data: user
            })
        }catch (error : any){
            res.status(400).json({
                success: false,
                message : error.message || "Registration Failed"
            })
        }
    }
}