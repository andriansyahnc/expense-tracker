// src/parser/command-parser.ts

export type TransactionType = 'EXPENSE' | 'INCOME';

export interface ParsedCommand {
  type: TransactionType;
  amount: number;
  category?: string;
  note?: string;
}

/**
 * Contoh input:
 * - "keluar 50rb buat cilok"
 * - "masuk 1jt dari gaji"
 */
export function parseCommand(input: string): ParsedCommand | null {
  const trimmed = input.trim().toLowerCase();

  const expenseRegex = /^(keluar|jajan|bayar|beli)\s+(\d+[.,]?\d*)([kkrbjt]*)\s*(buat|untuk)?\s*(.*)?$/i;
  const incomeRegex = /^(masuk|dapet|gaji|terima)\s+(\d+[.,]?\d*)([kkrbjt]*)\s*(dari)?\s*(.*)?$/i;

  const matchExpense = trimmed.match(expenseRegex);
  if (matchExpense) {
    const [, , rawAmount, suffix, , note] = matchExpense;
    return {
      type: 'EXPENSE',
      amount: parseIndoCurrency(rawAmount, suffix),
      note: note || undefined,
    };
  }

  const matchIncome = trimmed.match(incomeRegex);
  if (matchIncome) {
    const [, , rawAmount, suffix, , note] = matchIncome;
    return {
      type: 'INCOME',
      amount: parseIndoCurrency(rawAmount, suffix),
      note: note || undefined,
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
