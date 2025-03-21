import { PrismaClient } from "@prisma/client";
import { SECTOR } from "./data";

const prisma = new PrismaClient();

async function seedSkills() {
  for (const sector of SECTOR) {
    await prisma.user.upsert({
      where: { fitstName: sector },
      update: {},
      create: { fitstName: sector },
    });
  }

  console.log("Skills seeded successfully!");
}

seedSkills()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default seedSkills;
