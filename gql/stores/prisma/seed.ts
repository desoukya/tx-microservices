import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.store.deleteMany();

  console.log('Seeding...');

  const user1 = await prisma.store.create({
    data: {
      code: '378',
      address: {
        city: 'Washington',
        country: 'US',
        countryName: 'USA',
      },
      managerName: 'Amr Desouky'
    },
  });
  console.log({ user1 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });