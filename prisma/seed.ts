// import { PrismaClient } from "@prisma/client";
// import { POSITIONS, SKILLS, SECTOR } from './data';

// const prisma = new PrismaClient();
import seedSectors from "./seedSectors";
// import { seedProjects } from "./seedProjects"; // позже
// import { seedUsers } from "./seedUsers"; // позже

async function main() {
  await seedSectors();
  // await seedProjects(); // позже
  // await seedUsers(); // позже
}

main().catch(console.error);
