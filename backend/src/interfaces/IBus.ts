import { Schema } from "mongoose";
import { busStatus } from "../enums/busStatus";
import { IUser } from "./IUser";
import { IRoutes } from "./IRoutes";

export interface IBus extends Document {
    _id?: Schema.Types.ObjectId;
    licensePlate: string;
    busModel: string;
    capacity: number;
    status: busStatus;
    driverId: IUser['_id']
    routeId: IRoutes['_id'];
    createdAt?: Date;
  }