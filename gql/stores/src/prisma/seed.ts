// import { PrismaClient } from '@prisma/client';
// import { PrismaClient } from '../prisma/generated/client';
import { PrismaClient } from '@prisma/stores';

const prisma = new PrismaClient();

async function main() {
  await prisma.store.deleteMany();

  console.log('Seeding...');

  const store = await prisma.store.create({
    data: {
      code: '120',
      managerName: 'Amr Desouky',
      address: {
        create: { country: 'US', state: 'AL', stateName: 'Alabama', countryName: 'USA', city: 'Huntsville' },
      },
    },
    include: {
      address: true,
    },
  });
  console.log({ store });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
