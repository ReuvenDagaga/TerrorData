import { Request, Response } from "express";
import { getLimitTerrorEventsService, getTerrorEventsByBigCasualtiesService } from "../services/TerrorEvent.service";
import { ITerrorEvent } from "../interfaces/ITerrorEvent";



export const getTerrorEventsByBigCasualties = async (req: Request, res: Response) => {
    try {
      const TerrorEvents: ITerrorEvent[] | null = await getTerrorEventsByBigCasualtiesService();
      if (!TerrorEvents) {
        res.status(404).json({ msg: 'Terror Events not found' });
        return;
      }
      res.json(TerrorEvents);
    } catch (error) {
      res.status(500).json({ msg: 'Server error' + error });
    }
  };

  
export const getLimitTerrorEvents = async (req: Request, res: Response) => {
    try {
      const page = Number(req.query.page);
      const limit = Number(req.query.limit);
      const Buses = await getLimitTerrorEventsService(page, limit);
      if (!Buses) {
        res.status(404).json({ msg: 'terror Events not found' });
        return;
      }
      res.json(Buses);
    } catch (error) {
      res.status(500).json({ msg: 'Server error' + error });
    }
  };
  
  