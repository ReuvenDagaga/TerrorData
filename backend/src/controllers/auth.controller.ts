import { CookieOptions, Request, Response } from "express";
import { handleBadRequest, handleError } from "../utils/errorHandlar";
import { loginService, logoutService } from "../services/auth.service";


export const login = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const {foundUser ,token} = await loginService(user, res);
    const objectForRes = {foundUser, token}
    res.json(objectForRes)
  } catch (error: any) {    
    handleError(res, error.status, error.message);
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    await logoutService(req, res)
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    console.error(error.message);
  }
};