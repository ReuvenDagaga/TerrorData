import { Schema, Document, model } from 'mongoose';
import { IBus } from '../interfaces/IBus';


const BusesSchema = new Schema<IBus>({
  _id: { type: Schema.Types.ObjectId },
  licensePlate: { type: String, required: true },
  busModel: { type: String, required: true },
  capacity: { type: Number, required: true, unique: true },
  status: { type: String, required: true},
  driverId: { type: Schema.Types.ObjectId, required: true},
  routeId: { type: Schema.Types.ObjectId, required: true},
  createdAt: { type: Date, default: Date.now },
});

const Buses = model<IBus>('Buses', BusesSchema);

export { Buses };
