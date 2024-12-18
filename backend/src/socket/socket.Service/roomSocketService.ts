import { IMessage } from "../../interfaces/IMessage";
import { Rooms } from "../../models/ChatRoom.model";
import { handleBadRequest } from "../../utils/errorHandlar";

const getAllRooms = async () => {
  try {
    const allChatRooms = await Rooms.find();
    return allChatRooms;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const getRoomByName = async (roomName: string) => {
  try {
    const currentChatRoom = await Rooms.findOne({ roomName: roomName });
    if (!currentChatRoom) {
      throw new Error("Room not found");
    }
    return currentChatRoom;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const updateRoom = async (roomName: string, updateData: IMessage) => {
  try {
    const existingRoom = await Rooms.findOne({ roomName: roomName });
    if (!existingRoom) {
      throw new Error("Room not found");
    }
    existingRoom.messages.push(updateData);
    await existingRoom.save();
    return existingRoom;
  } catch (error) {
    console.error("Error in updateRoom:", error);
    throw error;
  }
};

export { getRoomByName, updateRoom };