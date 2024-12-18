import { Schema } from "mongoose";
import { userRole } from "../enums/userRole";

export interface IUser extends Document {
    _id?: Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: userRole;
    createdAt?: Date;
  }