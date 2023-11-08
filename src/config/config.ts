import { EnvConfiguration } from './interfaces/config.interface';

export const config: EnvConfiguration  = {
	app: {
		port: process.env.PORT
	},
	mongo: {
		uri: process.env.MONGO_URI,
		dbname: process.env.MONGO_DBNAME,
	},
	jwt: {
		secret: process.env.JWT_SECRET,
	},
	mailjet: {
		user: process.env.MAILJET_USER,
		pass: process.env.MAILJET_PASS,
		noreply: process.env.MAILJET_NOREPLY,
	},
}