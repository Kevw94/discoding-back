export interface EnvConfiguration {
	app: Configuration.Application;
	mongo: Configuration.MongoDB;
	jwt: Configuration.JWT;
	mailjet: Configuration.Mailjet;
}


export namespace Configuration {

	export interface Application {
		port: string;
		baseUrl: string
	}

	export interface MongoDB {
		uri: string;
		dbname: string;
	}

	export interface JWT {
		secret: string;
	}

	export interface Mailjet {
		user: string;
		pass: string;
		noreply: string;
	}
}
