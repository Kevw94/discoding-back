import { EnvConfiguration } from './interfaces/config.interface';

export const config: EnvConfiguration  = {
	app: {
		port: process.env.PORT
	},
	mongo: {
		uri: process.env.MONGO_URI,
		dbname: process.env.MONGO_DBNAME,
	},
}