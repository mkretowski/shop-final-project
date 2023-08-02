import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      name: 'T-shirt One',
      price: 10,
      description: 'Consectetur adipiscing elit.',
    },
    {
      name: 'T-shirt Two',
      price: 10,
      description: 'Consectetur adipiscing elit.',
    },
    {
      name: 'T-shirt Three',
      price: 10,
      description: 'Consectetur adipiscing elit.',
    },
    {
      name: 'T-shirt Four',
      price: 10,
      description: 'Consectetur adipiscing elit.',
    },
    {
      name: 'T-shirt Five',
      price: 10,
      description: 'Consectetur adipiscing elit.',
    },
    {
      name: 'T-shirt Six',
      price: 10,
      description: 'Consectetur adipiscing elit.',
    },
    {
      name: 'T-shirt Seven',
      price: 10,
      description: 'Consectetur adipiscing elit.',
    },
    {
      name: 'T-shirt Eight',
      price: 10,
      description: 'Consectetur adipiscing elit.',
    },
  ];
}

async function seed() {
  await db.product.createMany({
    data: getProducts(),
  });
}

seed()
  .catch((error) => {
    console.error('Error while seeding:', error);
  })
  .finally(async () => {
    await db.$disconnect();
  });
