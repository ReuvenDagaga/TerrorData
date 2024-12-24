import { NextFunction, Router } from 'express';
import { addTerrorEvent, deleteEvent, getDeadliestRegionsByGroup, getLimitTerrorEvents, getRegionsName, getTerrorEventsByBigCasualties, getTerrorEventsByBigCasualtiesAndRegions, getTerrorEventsByYearAndMonth, getTerrorOrgByRegions, getTerrorOrgByYear, updateEvent } from '../controllers/TerrorEvent.controller';


const router = Router();

router.get("/analysis/deadliest-attack-types", getTerrorEventsByBigCasualties)
router.get("/analysis/highest-casualty-regions", getTerrorEventsByBigCasualtiesAndRegions)
router.get("/analysis/incident-trends", getTerrorEventsByYearAndMonth)
router.get("/relationships/top-groups", getTerrorOrgByRegions)
router.get("/relationships/groups-by-year", getTerrorOrgByYear)
router.get("/relationships/deadliest-regions", getDeadliestRegionsByGroup)
router.get("/getRegionsName", getRegionsName)


router.post('/addEvent', addTerrorEvent);
router.delete('/deleteEvent/:id', deleteEvent);
router.put('/updateEvent', updateEvent);










router.get("/getLimitTerrorEvents", getLimitTerrorEvents)



export { router };
