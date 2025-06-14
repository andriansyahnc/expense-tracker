import { Body, Controller, Post } from '@nestjs/common';
import { TrackerService } from './tracker.service';

@Controller('track')
export class TrackerController {
  constructor(private readonly trackerService: TrackerService) {}

  @Post()
  async postCommand(@Body('command') command: string) {
    const result = await this.trackerService.handleCommand(command);
    return {
      message: 'Command diproses',
      result,
    };
  }
}
