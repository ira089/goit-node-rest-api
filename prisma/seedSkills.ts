import prisma from "./prismaClient";
import { SKILLS } from "./data";

async function seedSkills() {
  await prisma.skill.deleteMany();
  console.log("skill");
  for (const skill of SKILLS) {
    const existingSkill = await prisma.skill.findUnique({
      where: { name: skill },
    });

    if (!existingSkill) {
      await prisma.skill.create({
        data: { name: skill },
      });
    }
  }

  console.log("Skill seeded successfully!");
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
