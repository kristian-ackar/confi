import * as Router from 'koa-router';
import { AuthController, ConferenceController, BookingController } from 'controllers';


export const publicRouter = new Router();

publicRouter.post('/login', AuthController.login);

publicRouter.get('/conferences/:id([0-9]+)', ConferenceController.get);
publicRouter.get('/conferences', ConferenceController.getAll);

publicRouter.post('/bookings', BookingController.create);
