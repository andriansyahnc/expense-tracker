import { Module } from '@nestjs/common';
import { TrackerService } from './tracker.service.js';
import { TrackerController } from './tracker.controller.js';

@Module({
  controllers: [TrackerController],
  providers: [TrackerService],
})
export class TrackerModule {}
