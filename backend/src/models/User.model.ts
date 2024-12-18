import { Schema, Document, model } from 'mongoose';
import { IUser } from '../interfaces/IUser';


const UsersSchema = new Schema<IUser>({
  _id: { type: Schema.Types.ObjectId },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true},
  createdAt: { type: Date, default: Date.now },
});

const Users = model<IUser>('Users', UsersSchema);

export { Users };
