import prisma from "./prismaClient";
import { SECTOR } from "./data";

async function seedSectors() {
  await prisma.sector.deleteMany();
  console.log("sector");
  for (const sector of SECTOR) {
    const existingSector = await prisma.sector.findUnique({
      where: { name: sector },
    });

    if (!existingSector) {
      await prisma.sector.create({
        data: { name: sector },
      });
    }
  }

  // for (const sector of SECTOR) {
  //   await prisma.sector.upsert({
  //     where: { name: sector },
  //     update: {},
  //     create: { name: sector },
  //   });
  // }

  console.log("Sector seeded successfully!");
}

seedSectors()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default seedSectors;
