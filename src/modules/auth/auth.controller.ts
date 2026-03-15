import { Request, Response } from "express";
import { authService } from "./auth.service";
import { success } from "zod";
export const authController = {
    async registerController(req: Request, res: Response) {
        const user = await authService.registerUser(req.body);
        return res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data: user
        })
    },
    async loginController(req: Request, res: Response) {
        const { email, password } = req.body;
        
        const result = await authService.login(email, password);

        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            success: true,
            accessToken: result.accessToken,
            user: result.safeUser
        });
    },

}