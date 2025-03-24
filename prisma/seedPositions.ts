import prisma from "./prismaClient";
import {
  POSITIONS_DEVELOPMENT,
  POSITIONS_MANAGEMENT,
  POSITIONS_DESIGN,
  POSITIONS_MARKETING,
  POSITIONS_OTHERS,
} from "./data";

async function seedPositions() {
  await prisma.position.deleteMany();
  console.log("posi");
  for (const position of POSITIONS_DEVELOPMENT) {
    const existingPosition = await prisma.position.findUnique({
      where: { name: position },
    });

    if (!existingPosition) {
      await prisma.position.create({
        data: {
          name: position,
          category: "Розробка",
        },
      });
    }
  }
  console.log("разработка");

  for (const position of POSITIONS_MANAGEMENT) {
    await prisma.position.create({
      data: {
        name: position,
        category: "Менеджмент",
      },
    });
  }
  console.log("Менеджмент");

  for (const position of POSITIONS_DESIGN) {
    await prisma.position.create({
      data: {
        name: position,
        category: "Дизайн",
      },
    });
  }
  console.log("Дизайн");

  for (const position of POSITIONS_MARKETING) {
    await prisma.position.create({
      data: {
        name: position,
        category: "Маркетинг",
      },
    });
  }
  console.log("Маркетинг");

  for (const position of POSITIONS_OTHERS) {
    await prisma.position.create({
      data: {
        name: position,
        category: "Інші",
      },
    });
  }
  console.log("Інші");

  console.log("posit seeded successfully!");
}

seedPositions()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default seedPositions;
