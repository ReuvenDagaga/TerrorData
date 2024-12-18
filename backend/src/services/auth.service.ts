
import { CookieOptions, Request, Response } from "express";
import { comparePassword } from "../utils/comparePassword";
import { generateAuthToken } from "../utils/jwt";
import { handleBadRequest } from "../utils/errorHandlar";
import { IUser } from "../interfaces/IUser";
import { Users } from "../models/User.model";

interface UserDTO {
  name: string;
  password: string;
}

const cookieConfig: CookieOptions = {
  httpOnly: true, // הגנה מפני XSS - הקוקי לא נגיש דרך JavaScript בצד הלקוח
  secure: true, // שליחת הקוקי רק בחיבור HTTPS
  sameSite: "none", // הגנה מפני CSRF
}

interface dataReturnedFromLogin {
  foundUser: IUser,
  token: string
}

export const loginService = async (user: UserDTO, res: Response): Promise<dataReturnedFromLogin> => {
  try {
    if (!user?.name || !user?.password) {
      throw new Error("Missing required fields");
    }

    const foundUser = await Users.findOne({ name: user.name });
    if (!foundUser) {
      throw new Error("Could not find this user in the database");
    }

    const isPasswordCorrect = await comparePassword(
      user.password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      throw new Error("Incorrect password or Email");
    }

    const { _id } = foundUser;
    let token = generateAuthToken({ _id });
    if (!cookieConfig) {
      throw new Error("Cookie configuration is missing");
    }
    res.cookie("token", token, cookieConfig);
    return { foundUser, token };
  } catch (error: any) {
    error.status = 404;
    return handleBadRequest("MongoDB", error);
  }
};

export const logoutService = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });
      } catch (error) {
        console.log(error);
      }
};
