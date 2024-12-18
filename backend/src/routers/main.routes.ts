import { NextFunction, Router } from 'express';
import { getLimitTerrorEvents, getTerrorEventsByBigCasualties } from '../controllers/TerrorEvent.controller';


const router = Router();

router.get("/getAllTerrorEvents", getTerrorEventsByBigCasualties)
router.get("/getLimitTerrorEvents", getLimitTerrorEvents)



export { router };
