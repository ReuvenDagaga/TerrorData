import { Request, Response } from 'express';
import * as BusService from '../services/bus.service';
import { IBus } from '../interfaces/IBus';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  isAdmin: boolean;
}

export const getAllBuses = async (req: Request, res: Response) => {
  try {
    const Buses = await BusService.getAllBusesService();
    if (!Buses) {
      res.status(404).json({ msg: 'User not found' });
      return;
    }
    res.json(Buses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};


export const getLimitBuses = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const Buses = await BusService.getLimitBusesService(page, limit);
    if (!Buses) {
      res.status(404).json({ msg: 'User not found' });
      return;
    }
    res.json(Buses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getBusById = async (req: Request, res: Response) => {
  try {
    const bus = await BusService.getBusByIdService(req.params.id);
    if (!bus) {
      res.status(404).json({ msg: 'bus not found' });
      return;
    }
    res.json(bus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const updateBus = async (req: Request, res: Response): Promise<void> => {
  const updatedBusFromBody = req.body;
  const { id } = req.params;
  try {
  if (updatedBusFromBody) {
    const updatedBus = await BusService.updateBusService( id, updatedBusFromBody);
    if (!updatedBus) {
      res.status(404).json({ msg: 'Bus not found' });
      return;
  }
    res.json({ msg: 'Bus score updated', updatedBus });
}
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const createNewBus = async (req: Request, res: Response): Promise<void> => {
  const BusFromBody: IBus = req.body;    
  try {
    if (BusFromBody) {
      const newUser = await BusService.createNewBusService(BusFromBody);
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteBus = async (req: Request, res: Response): Promise<void> => {
  try {
      const result = await BusService.deleteBusService(req.params.id);
      res.json(result);
  } catch (error: any) {
    console.error(error);
  }
}
