import { ITerrorEvent } from "../interfaces/ITerrorEvent";
import { TerrorEvents } from "../models/TerrorEvent.model";

export const getAllTerrorEventsService = async (): Promise<ITerrorEvent[] | null> => {
    try {
      return await TerrorEvents.find();
    } catch (error) {
      throw new Error('Error fetching TerrorEvents');
    }
  };
  
  export const getLimitTerrorEventsService = async (page = 1, limit = 50): Promise<{}> => {
    try {
      const skip = (page - 1) * limit;
      const terrorEvents = await TerrorEvents.find().skip(skip).limit(limit);
      const totalTerrorEvents = await TerrorEvents.countDocuments();
  
      return {
        terrorEvents,
        totalPages: Math.ceil( totalTerrorEvents / limit),
        currentPage: page,
        totalTerrorEvents 
      }
    } catch (error) {
      throw new Error("Error fetching TerrorEvents");
    }
  };