import { Schema, model } from 'mongoose';
import { IMessage } from '../interfaces/IMessage';
import { IRoom } from '../interfaces/IRoom';

const MessageSchema = new Schema<IMessage>({
    userName: { type: String, required: true },
    message: { type: String, required: true},
    timeStamp: { type: String}
  });
  

const RoomsSchema = new Schema<IRoom>({
  _id: { type: Schema.Types.ObjectId },
  roomName: { type: String, required: true },
  messages: [MessageSchema],
});

const Rooms = model<IRoom>('rooms', RoomsSchema);

export { Rooms };

