export interface EnvConfiguration {
	app: Configuration.Application;
	mongo: Configuration.MongoDB
}


export namespace Configuration {

	export interface Application {
		port: string;
	}

	export interface MongoDB {
		uri: string;
		dbname: string;
	}
}
