import seedSectors from "./seedSectors";
// import seedSkills from "./seedSkills";
// import seedPositions from "./seedPositions";

async function main() {
  await seedSectors();
  // await seedSkills();
  // await seedPositions();
}

main().catch(console.error);
