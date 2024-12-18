import { ITerrorEvent } from "../interfaces/ITerrorEvent";
import { TerrorEvents } from "../models/TerrorEvent.model";

export const getTerrorEventsByBigCasualtiesService = async (): Promise<
  ITerrorEvent[] | null
> => {
  try {
    return await TerrorEvents.aggregate([
      {
        $group: {
          _id: "$attacktype1_txt",
          total: { $sum: { $sum: ["$nkill", "$nwound"] } },
        },
      },
      {
        $sort: { total: 1 },
      },
    ]);
  } catch (error) {
    throw new Error("Error fetching TerrorEvents");
  }
};

export const getLimitTerrorEventsService = async (
  page = 1,
  limit = 50
): Promise<{}> => {
  try {
    const skip = (page - 1) * limit;
    const terrorEvents = await TerrorEvents.find().skip(skip).limit(limit);
    const totalTerrorEvents = await TerrorEvents.countDocuments();

    return {
      terrorEvents,
      totalPages: Math.ceil(totalTerrorEvents / limit),
      currentPage: page,
      totalTerrorEvents,
    };
  } catch (error) {
    throw new Error("Error fetching TerrorEvents");
  }
};
