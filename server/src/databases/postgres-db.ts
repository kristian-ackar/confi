import { createConnection } from 'typeorm';
import { postgresTables } from './postgres-tables';
import env from 'environment';

export const postgresDB = async () => {
	return await createConnection({
		type     : 'postgres',
		host     : env.db.postgres.host,
		port     :  env.db.postgres.port,
		username : env.db.postgres.username,
		password : env.db.postgres.password,
		database : env.db.postgres.database,
		ssl: true,
		entities: postgresTables,
		logging: ['query', 'error'],
		synchronize: env.db.postgres.synchronize,
	}).then((conn) => {
		console.log('Database connection established');
	});
};