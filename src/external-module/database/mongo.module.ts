import { config } from '@/config/config';
import { Module } from '@nestjs/common';
import { MongoClient, type Db } from 'mongodb';

@Module({
	providers: [
		{
			provide: 'DATABASE_CONNECTION',
			useFactory: async (): Promise<Db> => {
				try {
					const client = await MongoClient.connect(config.mongo.uri, {
						//! Production settings
						// useUnifiedTopology: true,
						// useNewUrlParser: true,
						// tls:true,
					});

					return client.db(config.mongo.dbname);
				} catch (e) {
					throw e;
				}
			},
		},
	],
	exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
