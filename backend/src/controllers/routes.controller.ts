import { Request, Response } from 'express';
import * as RouteService from '../services/routes.service';
import jwt from 'jsonwebtoken';
import { IRoutes } from '../interfaces/IRoutes';


interface TokenPayload {
  id: string;
  isAdmin: boolean;
}

export const getAllRoutes = async (req: Request, res: Response) => {
  try {
    const Routers = await RouteService.getAllRoutesService();
    if (!Routers) {
      res.status(404).json({ msg: 'Routers not found' });
      return;
    }
    res.json(Routers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getRouteById = async (req: Request, res: Response) => {
  try {
    const route = await RouteService.getRouteByIdService(req.params.id);
    if (!route) {
      res.status(404).json({ msg: 'Route not found' });
      return;
    }
    res.json(route);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const updateRoute = async (req: Request, res: Response): Promise<void> => {
  const updatedRouteFromBody = req.body;
  const { id } = req.params;
  try {
  if (updatedRouteFromBody) {
    const updatedRoute = await RouteService.updateRouteService(id, updatedRouteFromBody);
    if (!updatedRoute) {
      res.status(404).json({ msg: 'Route not found' });
      return;
  }
    res.json({ msg: 'Route score updated', updatedRoute });
}
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const createNewRoute = async (req: Request, res: Response): Promise<void> => {
  const routeFromBody: IRoutes = req.body;        
  try {
    if (routeFromBody) {
      const newRoute = await RouteService.createRouteService(routeFromBody);
      res.status(201).json(newRoute);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


export const deleteRoute = async (req: Request, res: Response): Promise<void> => {
  try {
      const result = await RouteService.deleteRouteService(req.params.id);
      res.json(result);
  } catch (error: any) {
    console.error(error);
  }
}
