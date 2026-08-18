import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  console.log('No demo data is seeded in production. Use the /demo experience for product demonstrations.');
}

main().finally(() => db.$disconnect());
