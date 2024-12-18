import { Schema } from "mongoose";

export interface IRoutes extends Document {
    _id?: Schema.Types.ObjectId;
    lineNumber: string;
    name: string;
    stations: string[];
    schedule: Schedule[];
    createdAt?: Date;
  }


  export interface Schedule {
    departureTime: string;
    arrivalTime: string;
    station: string;
    createdAt?: Date;
  } 