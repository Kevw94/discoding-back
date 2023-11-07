export interface EnvConfiguration {
	app: Configuration.Application;
}


export namespace Configuration {

	export interface Application {
		port: string;
	}
}
