// src/app.module.ts
import { Module } from '@nestjs/common';
import { TrackerModule } from './tracker/tracker.module.js';

@Module({
  imports: [TrackerModule],
})
export class AppModule {}
