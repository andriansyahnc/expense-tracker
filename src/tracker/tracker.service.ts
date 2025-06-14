import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { parseCommand } from '../parser/command-parser';

const prisma = new PrismaClient();

@Injectable()
export class TrackerService {
  async handleCommand(raw: string) {
    const parsed = parseCommand(raw);
    if (!parsed) throw new Error('Command tidak dikenali');

    return prisma.transaction.create({
      data: {
        type: parsed.type,
        amount: parsed.amount,
        note: parsed.note,
      },
    });
  }
}
