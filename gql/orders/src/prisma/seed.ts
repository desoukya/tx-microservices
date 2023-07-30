import { PrismaClient } from '@prisma/orders';

const prisma = new PrismaClient();

async function main() {
  await prisma.order.deleteMany();

  console.log('Seeding...');

  const order = await prisma.order.createMany({
    data: [],
  });
  console.log({ order });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
