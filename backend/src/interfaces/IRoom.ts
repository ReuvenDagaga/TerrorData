import { Schema } from "mongoose";
import { IMessage } from "./IMessage";

export interface IRoom {
    _id: Schema.Types.ObjectId
    roomName: string,
    messages: IMessage[]
}