// import { PrismaClient } from "@prisma/client";
// import { POSITIONS, SKILLS, SECTOR } from './data';

// const prisma = new PrismaClient();
import seedSkills from "./seedSkills";
// import { seedProjects } from "./seedProjects"; // позже
// import { seedUsers } from "./seedUsers"; // позже

async function main() {
  await seedSkills();
  // await seedProjects(); // позже
  // await seedUsers(); // позже
}

main().catch(console.error);
