import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Get()
  async getAll() {
    return this.trackerService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.trackerService.getById(Number(id));
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.trackerService.delete(Number(id));
  }
}
