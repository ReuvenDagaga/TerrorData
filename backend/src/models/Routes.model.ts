import { Schema, Document, model } from 'mongoose';
import { IRoutes } from '../interfaces/IRoutes';


const RoutesSchema = new Schema<IRoutes>({
  _id: { type: Schema.Types.ObjectId },
  lineNumber: { type: String, required: true, unique: true},
  name: { type: String, required: true },
  stations: { type: [String], required: true },
  schedule: { type: [Object], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Routes = model<IRoutes>('Routes', RoutesSchema);

export { Routes };



