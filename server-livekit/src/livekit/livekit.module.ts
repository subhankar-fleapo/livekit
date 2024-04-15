import { Module } from '@nestjs/common';
import { LivekitController } from './livekit.controller';
import { LivekitService } from './livekit.service';

@Module({
  controllers: [LivekitController],
  providers: [LivekitService],
})
export class LivekitModule {}
