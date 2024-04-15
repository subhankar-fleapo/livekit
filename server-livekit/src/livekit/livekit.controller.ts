import { LivekitService } from './livekit.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('livekit')
export class LivekitController {
  constructor(private readonly livekitService: LivekitService) {}

  @Post('/create-token')
  createToken(@Body() body: { participantName: string }) {
    return this.livekitService.createToken(body.participantName);
  }
}
