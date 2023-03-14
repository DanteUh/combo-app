import { prisma } from "../src/server/db";

async function main() {
  const enDante = await prisma.user.upsert({
    where: { email: 'endante@test.com' },
    update: {},
    create: {
      email: 'endante@test.com',
      username: 'EnDante',
    },
  })
  const random = await prisma.user.upsert({
    where: { email: 'randomuser@prisma.io' },
    update: {},
    create: {
      email: 'randomuser@test.io',
      username: 'Randomuser',
    },
  })
  console.log({ enDante, random })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });