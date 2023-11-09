import { JwtService } from '@nestjs/jwt';
import { Server } from 'socket.io';
import { Inject, UseFilters, forwardRef } from '@nestjs/common';
import {
	WebSocketGateway,
	WebSocketServer,
	OnGatewayInit,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
} from '@nestjs/websockets';
import { ObjectId } from 'mongodb';

// @UseFilters(WSServiceErrorCatcher)
@WebSocketGateway({
	transports: ['websocket'],
	cors: {
		origin: '*', // to be defined later
	},
	namespace: '/',
})
export class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	constructor(
		// @Inject(forwardRef(() => RetrospectivesRepository))
		// private retrospectivesRepository: RetrospectivesRepository,
		// @Inject(forwardRef(() => UsersRepository))
		// private usersRepository: UsersRepository,
		// private readonly jwtService: JwtService,
	) {}

	@WebSocketServer() server: Server;

	afterInit(server: any) {
		console.log("azeaze");
	}

	// afterInit(server: Server) {
	// 	server.use(WSAuthMiddleware(this.jwtService));
	// }

	async handleConnection(client) {
		// console.log("onjour", client);

		// const query = { _id: client.user.id as ObjectId };
		// const projection = { projection: { profile: { email: 1 } } };
		// const user = await this.usersRepository.findOne(query, projection);

		client.join(client.roomId);
		client.to(client.roomId).emit('peer-connected');
	}

	handleDisconnect(client: any) {
		console.log("azeaze");

	}

	// async handleDisconnect(client: AuthSocket) {
	// 	const query = { _id: client.user.id as ObjectId };
	// 	const projection = { projection: { profile: { email: 1 } } };
	// 	const user = await this.usersRepository.findOne(query, projection);

	// 	const userDisconnected = {
	// 		email: user.profile.email,
	// 		id: client.id,
	// 	};

	// 	client.to(client.roomId).emit('peer-disconnected', userDisconnected);
	// }

	// @SubscribeMessage('new-friend')
	async sendFriendNotification() {
		console.log("PASSEEEED");
		console.log(this.server);


		this.server.sockets.to("aze").emit('new-friend');
	}
}
