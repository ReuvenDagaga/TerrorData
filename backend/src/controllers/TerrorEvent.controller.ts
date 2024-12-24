import { Request, Response } from "express";
import {
  addTerrorEventService,
    deleteEventService,
    getDeadliestRegionsByGroupService,
  getLimitTerrorEventsService,
  getRegionsNameService,
  getTerrorEventsByBigCasualtiesByAVGService,
  getTerrorEventsByBigCasualtiesService,
  getTerrorEventsByYearAndMonthService,
  getTerrorOrgByRegionsService,
  getTerrorOrgByYearService,
  updateEventService,
} from "../services/TerrorEvent.service";
import { ITerrorEvent } from "../interfaces/ITerrorEvent";

export const getTerrorEventsByBigCasualties = async (
  req: Request,
  res: Response
) => {
  try {
    const TerrorEvents: ITerrorEvent[] | null =
      await getTerrorEventsByBigCasualtiesService();
    if (!TerrorEvents) {
      res.status(404).json({ msg: "Terror Events not found" });
      return;
    }
    res.json(TerrorEvents);
  } catch (error) {
    res.status(500).json({ msg: "Server error" + error });
  }
};

export const getRegionsName = async (
  req: Request,
  res: Response
) => {
  try {
    const TerrorEvents: ITerrorEvent[] | null =
      await getRegionsNameService();
    if (!TerrorEvents) {
      res.status(404).json({ msg: "Terror Events not found" });
      return;
    }
    res.json(TerrorEvents);
  } catch (error) {
    res.status(500).json({ msg: "Server error" + error });
  }
};

export const getTerrorEventsByBigCasualtiesAndRegions = async (
  req: Request,
  res: Response
) => {
  try {
    const TerrorEvents: ITerrorEvent[] | null =
      await getTerrorEventsByBigCasualtiesByAVGService();
    if (!TerrorEvents) {
      res.status(404).json({ msg: "Terror Events not found" })
      return;
    }
    res.json(TerrorEvents);
  } catch (error) {
    res.status(500).json({ msg: "Server error" + error });
  }
};

export const getTerrorEventsByYearAndMonth = async (
  req: Request,
  res: Response
) => {
  try {
    const yearStart = Number(req.query.yearStart);
    const yearEnd = Number(req.query.yearEnd);
    const monthStart = Number(req.query.monthStart);
    const monthEnd = Number(req.query.monthEnd);
    const dateToSearch = { yearStart, yearEnd, monthStart, monthEnd };
    const TerrorEvents = await getTerrorEventsByYearAndMonthService(
      dateToSearch
    );
    if (!TerrorEvents) {
      res.status(404).json({ msg: "Terror Events not found" });
      return;
    }
    res.json(TerrorEvents);
  } catch (error) {
    res.status(500).json({ msg: "Server error " + error });
  }
};

export const getTerrorOrgByRegions = async (req: Request, res: Response) => {
  try {
    const regionName = req.query.regionName as string;
    const limit = Number(req.query.limit);
    const TerrorEvents = await getTerrorOrgByRegionsService(regionName, limit);
    if (!TerrorEvents) {
      res.status(404).json({ msg: "Terror Events not found" });
      return;
    }
    res.json(TerrorEvents);
  } catch (error) {
    res.status(500).json({ msg: "Server error " + error });
  }
};

export const getTerrorOrgByYear = async (req: Request, res: Response) => {
  try {
    const year = Number(req.query.year);
    const TerrorEvents = await getTerrorOrgByYearService(year);
    if (!TerrorEvents) {
      res.status(404).json({ msg: "Terror Events not found" });
      return;
    }
    res.json(TerrorEvents);
  } catch (error) {
    res.status(500).json({ msg: "Server error " + error });
  }
};

export const getDeadliestRegionsByGroup = async (req: Request, res: Response) => {
    try {
      const nameGroup = (req.query.nameGroup as string)
      const TerrorEvents = await getDeadliestRegionsByGroupService(nameGroup);
      if (!TerrorEvents) {
        res.status(404).json({ msg: "Terror Events not found" });
        return;
      }
      res.json(TerrorEvents);
    } catch (error) {
      res.status(500).json({ msg: "Server error " + error });
    }
  };

  
export const getLimitTerrorEvents = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const TerrorEvents = await getLimitTerrorEventsService(page, limit);
    if (!TerrorEvents) {
      res.status(404).json({ msg: "terror Events not found" });
      return;
    }
    res.json(TerrorEvents);
  } catch (error) {
    res.status(500).json({ msg: "Server error" + error });
  }
};


export const addTerrorEvent = async (req: Request, res: Response): Promise<void> => {
  const terrorEventFromBody: Partial<ITerrorEvent> = req.body;    
  try {
    if (terrorEventFromBody) {
      const newTerrorEvent = await addTerrorEventService(terrorEventFromBody);
      res.status(201).json(newTerrorEvent);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteEvent= async (req: Request, res: Response): Promise<void> => {
  try {
      const result = await deleteEventService(req.params.id);
      res.json(result);
  } catch (error: any) {
    console.error(error);
  }
}

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  const updatedEventFromBody: ITerrorEvent = req.body;  
  try {    
  if (updatedEventFromBody) {
    const updatedEvent = await updateEventService(updatedEventFromBody);    
    if (!updatedEvent) {
      res.status(404).json({ msg: 'User not found' });
      return;
  }
    res.json({ msg: 'Event updated', updatedEvent });
}
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};



