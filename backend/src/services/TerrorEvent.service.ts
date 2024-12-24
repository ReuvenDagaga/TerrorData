import { log } from "console";
import { ITerrorEvent } from "../interfaces/ITerrorEvent";
import { TerrorEvents } from "../models/TerrorEvent.model";
import { dateToSearchDTO } from "../interfaces/DateToSearch";
import mongoose from "mongoose";

export const getTerrorEventsByBigCasualtiesService = async (): Promise<
  ITerrorEvent[] | null
> => {
  try {
    return await TerrorEvents.aggregate([
      {
        $group: {
          _id: "$attacktype1_txt",
          totalKills: { $sum: { $sum: ["$nkill", "$nwound"] } },
        },
      },
      {
        $sort: { totalKills: 1 },
      },
    ]);
  } catch (error) {
    throw new Error("Error fetching TerrorEvents");
  }
};

export const getRegionsNameService = async (): Promise<
  ITerrorEvent[] | null
> => {
  try {
    return await TerrorEvents.aggregate([
      {
        $group: {
          _id: "$region_txt",
        }
      },
      {
        $sort: { _id: 1 },
      },
    ]);
  } catch (error) {
    throw new Error("Error fetching TerrorEvents");
  }
};

export const getTerrorEventsByYearAndMonthService = async (
  dateToSearch: dateToSearchDTO
): Promise<ITerrorEvent[] | null> => {
  try {
    return await TerrorEvents.aggregate([
      {
        $match: {
          iyear: { $gte: dateToSearch.yearStart, $lte: dateToSearch.yearEnd },
          imonth: {
            $gte: dateToSearch.monthStart,
            $lte: dateToSearch.monthEnd,
          },
        },
      },
      {
        $group: {
          _id: { year: "$iyear", month: "$imonth" },
          totalKills: { $sum: { $sum: ["$nkill", "$nwound"] } },
          totalEvents: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          totalKill: "$totalKills",
          totalEvents: "$totalEvents",
        },
      },
      {
        $sort: { year: 1, month: 1 },
      },
    ]);
  } catch (error) {
    throw new Error("Error fetching TerrorEvents");
  }
};

export const getTerrorEventsByBigCasualtiesByAVGService = async (): Promise<
  ITerrorEvent[] | null
> => {
  try {
    return await TerrorEvents.aggregate([
      {
        $group: {
          _id: {
            region: "$region_txt",
            city: "$city",
            lat: "$latitude",
            long: "$longitude",
          },
          total: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: { region: "$_id.region", lat: "$_id.lat", long: "$_id.long" },
          total: { $sum: "$total" },
          totalKills: { $sum: { $sum: ["$nkill", "$nwound"] } },
        },
      },
      {
        $project: {
          _id: 0,
          region: "$_id.region",
          count: { $avg: ["$total", "$totalKills"] },
          lat: "$_id.lat",
          long: "$_id.long",
        },
      },
      {
        $sort: { count: 1 },
      },
    ]);
  } catch (error) {
    throw new Error("Error fetching TerrorEvents");
  }
};

export const getTerrorOrgByRegionsService = async (
  regionName: string,
  limit: number
): Promise<ITerrorEvent[] | null> => {
  try {
    console.log(regionName);
    return await TerrorEvents.aggregate([
      {
        $match: { region_txt: regionName },
      },
      {
        $group: {
          _id: {gname: "$gname", lat: "$latitude", long: "$longitude", region: "$region_txt"},
          total: { $sum: { $sum: ["$nkill", "$nwound"] } },
        },
      },
      {
        $project: {
          _id: 0,
          gname: "$_id.gname",
          lat: "$_id.lat",
          long: "$_id.long",
          total: "$total",
          region: "$_id.region",
        },
      },
      {
        $sort: { total: -1 },
      },
      {
        $limit: limit ? limit : 5,
      },
    ]);
  } catch (error) {
    throw new Error("Error fetching TerrorEvents");
  }
};

export const addTerrorEventService = async (newTerrorEvent: Partial<ITerrorEvent>): Promise<Partial<ITerrorEvent>> => {
  try {
    const nTerrorEvent = new TerrorEvents({
      _id: new mongoose.Types.ObjectId(),
      eventid: newTerrorEvent.eventid,
      iyear: newTerrorEvent.iyear, 
      imonth: newTerrorEvent.imonth,
      iday: newTerrorEvent.iday,
      country_txt: newTerrorEvent.country_txt,
      region_txt: newTerrorEvent.region_txt, 
      city: newTerrorEvent.city,
      latitude: newTerrorEvent.latitude,
      longitude: newTerrorEvent.longitude,
      attacktype1_txt: newTerrorEvent.attacktype1_txt,
      targtype1_txt: newTerrorEvent.targtype1_txt,
      target1: newTerrorEvent.target1,
      gname: newTerrorEvent.gname,
      weaptype1_txt: newTerrorEvent.weaptype1_txt,
      nkill: newTerrorEvent.nkill,
      nwound: newTerrorEvent.nwound,
      nperps: newTerrorEvent.nperps,
      summary: newTerrorEvent.summary
    });
    await nTerrorEvent.save();
    return nTerrorEvent;
  } catch (error) {
    throw error;
  }
};

export const getTerrorOrgByYearService = async (
  year: number
): Promise<ITerrorEvent[] | null> => {
  try {
    return await TerrorEvents.aggregate([
      {
        $match: { iyear: year },
      },
      {
        $group: {
          _id: "$gname",
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

export const getDeadliestRegionsByGroupService = async (nameGroup: string) => {
  try {
    const result = await TerrorEvents.aggregate([
      {
        $match: {
          gname: nameGroup,
        },
      },
      {
        $group: {
          _id: {
            country: "$country_txt",
            region: "$region_txt",
          },
          total: { $sum: { $add: ["$nkill", "$nwound"] } },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
      {
        $project: {
          _id: 0,
          region: "$_id.region",
          country: "$_id.country",
          total: 1,
        },
      },
    ]);

    return result;
  } catch (error) {
    console.error("Error during aggregation:", error);
    return [];
  }
};

export const getLimitTerrorEventsService = async (
  page = 1,
  limit = 50
): Promise<{}> => {
  try {
    const skip = (page - 1) * limit;

    const results = await TerrorEvents.aggregate([
      {
        $facet: {
          terrorEvents: [
            { $skip: skip },
            { $limit: limit },
          ],
          totalTerrorEvents: [
            { $count: "count" },
          ],
        },
      },
      {
        $addFields: {
          totalTerrorEvents: { $arrayElemAt: ["$totalTerrorEvents.count", 0] },
        },
      },
    ]);

    const { terrorEvents, totalTerrorEvents } = results[0];
    const totalPages = Math.ceil(totalTerrorEvents / limit);

    return {
      terrorEvents,
      totalPages,
      currentPage: page,
      totalTerrorEvents,
    };
  } catch (error) {
    throw new Error("Error fetching TerrorEvents with aggregation");
  }
};

export const deleteEventService = async (eventId: string) => {
  try {
    const result = await TerrorEvents.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(eventId) } },
      { $limit: 1 },
      { $project: { _id: 1 } }
    ]);

    if (result.length === 0) {
      throw new Error("Event not found");
    }

    await TerrorEvents.deleteOne({ _id: new mongoose.Types.ObjectId(eventId) });

    return { message: "Event deleted successfully" };
  } catch (error: any) {
    return console.error(error);
  }
};


export const updateEventService = async (event: ITerrorEvent) => {
  try {
    if (event) {
      const result = await TerrorEvents.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(event._id.toString()) } },
        { $limit: 1 },
        { $project: { _id: 1 } }
      ]);
      
      if (result.length === 0) {
        throw new Error("Event not found");
      }
      
      const updatedEvent = await TerrorEvents.updateOne(
        { _id: new mongoose.Types.ObjectId(event._id.toString()) },
        {
          $set: {
            eventid: event.eventid,
            iyear: event.iyear,
            imonth: event.imonth,
            iday: event.iday,
            country_txt: event.country_txt,
            region_txt: event.region_txt,
            city: event.city,
            latitude: event.latitude,
            longitude: event.longitude,
            attacktype1_txt: event.attacktype1_txt,
            targtype1_txt: event.targtype1_txt,
            target1: event.target1,
            gname: event.gname,
            weaptype1_txt: event.weaptype1_txt,
            nkill: event.nkill,
            nwound: event.nwound,
            nperps: event.nperps,
            summary: event.summary
          }
        }
      );
      
      if (!updatedEvent) {
        throw new Error("Error updating Event");
      }
      return updatedEvent;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

