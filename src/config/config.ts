import { EnvConfiguration } from './interfaces/config.interface';

export const config: EnvConfiguration  = {
	app: {
		port: process.env.PORT
	}
}