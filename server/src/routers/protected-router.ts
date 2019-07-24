import * as jwt from 'koa-jwt';
import * as Router from 'koa-router';
import env from 'environment';
import { ConferenceController, BookingController } from 'controllers';

export const protectedRouter = new Router();

protectedRouter.use(jwt({ secret: env.secret }));
protectedRouter.post('/conferences', ConferenceController.create);
protectedRouter.put('/conferences/:id([0-9]+)', ConferenceController.update);
protectedRouter.patch('/conferences/:id([0-9]+)', ConferenceController.update);
protectedRouter.delete('/conferences/:id([0-9]+)', ConferenceController.delete);

protectedRouter.get('/bookings/:id([0-9]+)', BookingController.get);
protectedRouter.get('/bookings', BookingController.getAll);
protectedRouter.put('/bookings/:id([0-9]+)', BookingController.update);
protectedRouter.patch('/bookings/:id([0-9]+)', BookingController.update);
protectedRouter.delete('/bookings/:id([0-9]+)', BookingController.delete);