import mongoose from 'mongoose';
import { IRoutes } from '../interfaces/IRoutes';
import { Routes } from '../models/Routes.model';

export const getRouteByIdService = async (id: string): Promise<IRoutes | null> => {
  try {
    return await Routes.findById(id);
  } catch (error) {
    throw new Error('Error fetching Routers');
  }
};


export const getAllRoutesService = async (): Promise<IRoutes[] | null> => {
  try {
    return await Routes.find();
  } catch (error) {
    throw new Error('Error fetching Routes');
  }
};


export const updateRouteService = async (id: string, route: IRoutes) => {
  try {
    const updatedRoutes = await Routes.findById(id);
    if (!updatedRoutes) {
      throw new Error('Route not found');
    }
    updatedRoutes.lineNumber = route.lineNumber,
    updatedRoutes.name = route.name,
    updatedRoutes.stations = route.stations,
    updatedRoutes.schedule = route.schedule,

    await updatedRoutes.save();
    return updatedRoutes;
  } catch (error) {
    throw new Error('Error updating Bus score');
  }
};

export const createRouteService = async (newRoute: IRoutes): Promise<IRoutes> => {
  try {    
      const nRoutes = new Routes ({
        _id: new mongoose.Types.ObjectId(),
        lineNumber: newRoute.lineNumber,
        name: newRoute.name,
        stations: newRoute.stations,
        schedule: newRoute.schedule,
        });      

    await nRoutes.save(); 
    return nRoutes;
  } catch (error) {
    throw error;
  }
};


export const deleteRouteService = async (routeId: string) => {
  try {
      const deletedRoute = await Routes.findByIdAndDelete(routeId);
      if (!deletedRoute) {
          throw new Error("Route not found");
      }
      return { message: "Route deleted successfully" };
  } catch (error: any) {
      return console.error(error); 
  }
};
