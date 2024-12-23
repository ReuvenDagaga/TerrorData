import { log } from "console";
import { ITerrorEvent } from "../interfaces/ITerrorEvent";
import { TerrorEvents } from "../models/TerrorEvent.model";
import { dateToSearchDTO } from "../interfaces/DateToSearch";

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
          _id: "$gname",
          total: { $sum: { $sum: ["$nkill", "$nwound"] } },
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
