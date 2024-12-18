import { NextFunction, Router } from 'express';
import { getLimitTerrorEvents } from '../controllers/TerrorEvent.controller';
// import { getAllTerrorEvents } from '../controllers/TerrorEvent.controller';


const router = Router();

// router.get("/getAllTerrorEvents", getAllTerrorEvents)
router.get("/getLimitTerrorEvents", getLimitTerrorEvents)



export { router };
