import { Module } from '@nestjs/common';

import { LivekitModule } from './livekit/livekit.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), LivekitModule],
})
export class AppModule {}
