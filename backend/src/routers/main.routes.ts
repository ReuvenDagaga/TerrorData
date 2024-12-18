import { NextFunction, Router } from 'express';
import * as UserController from '../controllers/user.controller';
import * as BusController from '../controllers/bus.controller';
import * as RoutesController from '../controllers/routes.controller';
import * as authController from '../controllers/auth.controller';
import { verifyUser } from '../utils/jwt';

const router = Router();

router.get('/getUser/:id',verifyUser as NextFunction, UserController.getUserById);
router.get('/getAllUsers',verifyUser as NextFunction, UserController.getAllUsers);
router.put('/updateUser',verifyUser as NextFunction, UserController.updateUser);
router.delete('/deleteUser/:id',verifyUser as NextFunction, UserController.deleteUser);

router.post('/addNewBus',verifyUser as NextFunction, BusController.createNewBus);
router.get('/getBus/:id',verifyUser as NextFunction, BusController.getBusById);
router.get('/getAllBuses',verifyUser as NextFunction, BusController.getAllBuses);
router.get('/getLimitBuses',verifyUser as NextFunction, BusController.getLimitBuses)
router.put('/updateBus/:id',verifyUser as NextFunction, BusController.updateBus);
router.delete('/deleteBus/:id',verifyUser as NextFunction, BusController.deleteBus);

router.post('/addNewRoute',verifyUser as NextFunction, RoutesController.createNewRoute);
router.get('/getRoute/:id',verifyUser as NextFunction, RoutesController.getRouteById);
router.get('/getAllRoutes',verifyUser as NextFunction, RoutesController.getAllRoutes);
// router.get('/getLimitRoutes',verifyUser as NextFunction, RoutesController.getLimitRoutes);
router.put('/updateRoute/:id',verifyUser as NextFunction, RoutesController.updateRoute);
router.delete('/deleteRoute/:id',verifyUser as NextFunction, RoutesController.deleteRoute);



router.post('/register', UserController.createNewUser);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

export { router };
