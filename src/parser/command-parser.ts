// src/parser/command-parser.ts

export type TransactionType = 'EXPENSE' | 'INCOME' | 'DEBT' | 'DEBT_PAYMENT';

export interface ParsedCommand {
  type: TransactionType;
  amount: number;
  category?: string;
  note?: string;
  to?: string; // untuk utang/piutang ke siapa
  user?: string;
  household?: string;
}

/**
 * Contoh input:
 * - "keluar 50rb buat cilok"
 * - "masuk 1jt dari gaji"
 * - "utang 500rb ke budi buat makan"
 * - "bayar utang 250rb ke budi"
 * - "keluar 50rb user:andi household:keluarga"
 */
export function parseCommand(input: string): ParsedCommand | null {
  const trimmed = input.trim().toLowerCase();

  const expenseRegex =
    /^(keluar|jajan|bayar|beli)\s+(\d+[.,]?\d*)([kkrbjt]*)\s*(buat|untuk)?\s*([^\s]+(?:\s[^\s]+)*)?(\s+user:(\w+))?(\s+household:(\w+))?/i;
  const incomeRegex =
    /^(masuk|dapet|gaji|terima)\s+(\d+[.,]?\d*)([kkrbjt]*)\s*(dari)?\s*([^\s]+(?:\s[^\s]+)*)?(\s+user:(\w+))?(\s+household:(\w+))?/i;
  const debtRegex =
    /^utang\s+(\d+[.,]?\d*)([kkrbjt]*)\s+ke\s+(\w+)(\s+buat\s+([^\s]+(?:\s[^\s]+)*))?(\s+user:(\w+))?(\s+household:(\w+))?/i;
  const repayDebtRegex =
    /^bayar\s+utang\s+(\d+[.,]?\d*)([kkrbjt]*)\s+ke\s+(\w+)(\s+user:(\w+))?(\s+household:(\w+))?/i;

  const matchExpense = trimmed.match(expenseRegex);
  if (matchExpense) {
    const [, , rawAmount, suffix, , note, , user, , household] = matchExpense;
    return {
      type: 'EXPENSE',
      amount: parseIndoCurrency(rawAmount, suffix),
      note: note || undefined,
      user,
      household,
    };
  }

  const matchIncome = trimmed.match(incomeRegex);
  if (matchIncome) {
    const [, , rawAmount, suffix, , note, , user, , household] = matchIncome;
    return {
      type: 'INCOME',
      amount: parseIndoCurrency(rawAmount, suffix),
      note: note || undefined,
      user,
      household,
    };
  }

  const matchDebt = trimmed.match(debtRegex);
  if (matchDebt) {
    const [, rawAmount, suffix, to, , note, , user, , household] = matchDebt;
    return {
      type: 'DEBT',
      amount: parseIndoCurrency(rawAmount, suffix),
      to,
      note: note || undefined,
      user,
      household,
    };
  }

  const matchRepay = trimmed.match(repayDebtRegex);
  if (matchRepay) {
    const [, rawAmount, suffix, to, , user, , household] = matchRepay;
    return {
      type: 'DEBT_PAYMENT',
      amount: parseIndoCurrency(rawAmount, suffix),
      to,
      user,
      household,
    };
  }

  return null;
}

function parseIndoCurrency(amount: string, suffix: string): number {
  let value = parseFloat(amount.replace(',', '.'));

  switch (suffix) {
    case 'rb':
    case 'ribu':
      value *= 1_000;
      break;
    case 'jt':
    case 'juta':
      value *= 1_000_000;
      break;
    case 'k':
      value *= 1_000;
      break;
  }

  return Math.round(value);
}
