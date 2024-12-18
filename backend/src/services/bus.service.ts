import mongoose from "mongoose";
import { generateUserPassword } from "../utils/comparePassword";
import { Buses } from "../models/Bus.model";
import { IBus } from "../interfaces/IBus";

export const getBusByIdService = async (id: string): Promise<IBus | null> => {
  try {
    return await Buses.findById(id);
  } catch (error) {
    throw new Error("Error fetching User");
  }
};

export const getAllBusesService = async (): Promise<IBus[] | null> => {
  try {
    return await Buses.find();
  } catch (error) {
    throw new Error("Error fetching Buses");
  }
};

export const getLimitBusesService = async (page = 1, limit = 5): Promise<{}> => {
  try {
    const skip = (page - 1) * limit;
    const buses = await Buses.find().skip(skip).limit(limit);
    const totalBuses = await Buses.countDocuments();

    return {
      buses,
      totalPages: Math.ceil( totalBuses / limit),
      currentPage: page,
      totalBuses 
    }
  } catch (error) {
    throw new Error("Error fetching Buses");
  }
};

export const updateBusService = async (id: string, bus: IBus) => {
  try {
    const updatedBus = await Buses.findById(id);
    if (!updatedBus) {
      throw new Error("Bus not found");
    }
    (updatedBus.licensePlate = bus.licensePlate),
      (updatedBus.busModel = bus.licensePlate),
      (updatedBus.capacity = bus.capacity),
      (updatedBus.status = bus.status),
      (updatedBus.driverId = bus.driverId),
      (updatedBus.routeId = bus.routeId),
      await updatedBus.save();
    return updatedBus;
  } catch (error) {
    throw new Error("Error updating Bus score");
  }
};

export const createNewBusService = async (
  newBus: Partial<IBus>
): Promise<IBus> => {
  try {
    const nBus = new Buses({
      _id: new mongoose.Types.ObjectId(),
      licensePlate: newBus.licensePlate,
      busModel: newBus.busModel,
      capacity: newBus.capacity,
      status: newBus.status,
      driverId: newBus.driverId,
      routeId: newBus.routeId,
    });
    await nBus.save();
    return nBus;
  } catch (error) {
    throw error;
  }
};

export const deleteBusService = async (busId: string) => {
  try {
    const deletedBus = await Buses.findByIdAndDelete(busId);
    if (!deletedBus) {
      throw new Error("Bus not found");
    }
    return { message: "Bus deleted successfully" };
  } catch (error: any) {
    return console.error(error);
  }
};
