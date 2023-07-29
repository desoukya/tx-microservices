import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.customer.deleteMany();

  console.log('Seeding...');

  const customer = await prisma.customer.create({
    data: {
      name: 'Amr Desouky',
    }
  });
  console.log({ customer });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });