import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import {
  AccessToken,
  CreateOptions,
  RoomServiceClient,
  VideoGrant,
} from 'livekit-server-sdk';

@Injectable()
export class LivekitService {
  private roomService: RoomServiceClient;

  constructor(private readonly configService: ConfigService) {
    this.roomService = new RoomServiceClient(
      configService.getOrThrow('LIVEKIT_HOST'),
      configService.getOrThrow('LIVEKIT_API_KEY'),
      configService.getOrThrow('LIVEKIT_API_SECRET'),
    );
  }

  createToken(participantName: string) {
    const roomName = 'quickstart-room';

    const token = new AccessToken(
      this.configService.getOrThrow('LIVEKIT_API_KEY'),
      this.configService.getOrThrow('LIVEKIT_API_SECRET'),
      {
        identity: participantName,
        ttl: '10m',
      },
    );

    const options: VideoGrant = {
      roomJoin: true,
      room: roomName,
      canPublish: participantName === 'admin',
    };

    token.addGrant(options);

    return { token: token.toJwt() };
  }

  async createRoom() {
    try {
      const options: CreateOptions = {
        name: 'quickstart-room',
        emptyTimeout: 1 * 60, // 1 minutes
        maxParticipants: 20,
      };
      const room = await this.roomService.createRoom(options);
      console.log(room);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteRoom() {
    try {
      const roomName = 'quickstart-room';
      const room = await this.roomService.deleteRoom(roomName);
      console.log(room);
    } catch (error) {
      console.log(error);
    }
  }
}
