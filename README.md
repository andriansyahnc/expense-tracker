# Expense Tracker NestJS

📊 Personal finance tracker via chat — designed to feel like talking to a friend.  
Supports expenses, debts, loans (piutang), investments, and savings. Built with NestJS.

---

## ✨ Features

- ✅ Expense & income logging
- ✅ Debt & loan (piutang) tracking
- ✅ Support for interest, tenor, and flexible commands
- ✅ Multi-user & multi-household support
- ✅ Investment & savings tracking
- ✅ Simple CLI/chat-based input (e.g., "keluar 20rb buat kopi")

---

## 🧰 Tech Stack

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- SQLite (dev), ready for Postgres/Mongo
- TypeScript

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/expense-tracker-nest.git
cd expense-tracker-nest
npm install
```

### 2. Setup Environment

Create `.env`:

```env
DATABASE_URL="file:./dev.db"
```

### 3. Migrate DB

```bash
npx prisma migrate dev --name init
```

### 4. Run App

```bash
npm run start:dev
```

---

## 📌 Example Commands

```
keluar 50rb buat cilok
utang ke BRI 2jt bunga 10% tenor 24 bulan
pinjemin Rudi 300rb
tabung 1jt ke jenius
investasi 500rb ke bibit pribadi
update nilai bibit pribadi jadi 1.1jt
```

---

## 🧠 Notes

- Indonesia currency-focused
- Designed for realistic household financial management
- Command parser supports informal, flexible inputs

---

## 📜 License

MIT
