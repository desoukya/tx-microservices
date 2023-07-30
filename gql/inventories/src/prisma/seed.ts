import { PrismaClient } from '@prisma/inventories';

const prisma = new PrismaClient();

async function main() {
  await prisma.inventory.deleteMany();

  console.log('Seeding...');

  const inventory = await prisma.inventory.createMany({
    data: [
      {
        name: 'CandyCornRv',
        manufactureDate: new Date(),
        availableQuantity: 50,
      },
      {
        name: 'SmartiesBoxTruck,',
        manufactureDate: new Date(),
        availableQuantity: 40,
      },
      {
        name: 'LollipopCycle,,',
        manufactureDate: new Date(),
        availableQuantity: 30,
      },
    ],
  });
  console.log({ inventory });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
