import { NextFunction, Router } from 'express';
import { addTerrorEvent, getDeadliestRegionsByGroup, getLimitTerrorEvents, getRegionsName, getTerrorEventsByBigCasualties, getTerrorEventsByBigCasualtiesAndRegions, getTerrorEventsByYearAndMonth, getTerrorOrgByRegions, getTerrorOrgByYear } from '../controllers/TerrorEvent.controller';


const router = Router();

router.get("/analysis/deadliest-attack-types", getTerrorEventsByBigCasualties)
router.get("/analysis/highest-casualty-regions", getTerrorEventsByBigCasualtiesAndRegions)
router.get("/analysis/incident-trends", getTerrorEventsByYearAndMonth)
router.get("/relationships/top-groups", getTerrorOrgByRegions)
router.get("/relationships/groups-by-year", getTerrorOrgByYear)
router.get("/relationships/deadliest-regions", getDeadliestRegionsByGroup)
router.get("/getRegionsName", getRegionsName)
router.post('/addEvent', addTerrorEvent);








router.get("/getLimitTerrorEvents", getLimitTerrorEvents)



export { router };
