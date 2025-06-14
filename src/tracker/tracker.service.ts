import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { parseCommand } from '../parser/command-parser.js';

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

  async getAll() {
    return prisma.transaction.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getById(id: number) {
    const trx = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!trx) throw new Error('Transaksi tidak ditemukan');

    return trx;
  }

  async delete(id: number) {
    const trx = await prisma.transaction.findUnique({ where: { id } });
    if (!trx) throw new Error('Transaksi tidak ditemukan');

    await prisma.transaction.delete({ where: { id } });
    return { message: 'Transaksi berhasil dihapus' };
  }
}
