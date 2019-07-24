import env from 'environment';
import app from './app';
import { postgresDB } from './databases/postgres-db';
import { publicRouter, protectedRouter } from './routers';
import * as cors from '@koa/cors';
import * as bodyParser from 'koa-bodyparser';

const bootstrap = async () => {
	// Init database
	await postgresDB();

	app.use(cors({ origin: ['*'] }));

	// Enable bodyParser which is needed to work with information
	// passed to the server from the client requests 
	app.use(bodyParser());

	app.use(publicRouter.routes(), publicRouter.allowedMethods());

	app.use(protectedRouter.routes(), protectedRouter.allowedMethods());

	app.listen(env.port || 3000);
};

bootstrap();

/* // Init database
postgresDB();

app.use(cors({ origin: ['*'] }));

// Enable bodyParser which is needed to work with information
// passed to the server from the client requests 
app.use(bodyParser());

app.use(publicRouter.routes(), publicRouter.allowedMethods());

app.use(protectedRouter.routes(), protectedRouter.allowedMethods());

app.listen(env.port || 3000);

export default app; */