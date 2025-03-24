// import seedSectors from "./seedSectors";
// import seedSkills from "./seedSkills";
// import seedPositions from "./seedPositions";
import seedAdmin from "./seedAdmin";

async function main() {
  // await seedSectors();
  // await seedSkills();
  // await seedPositions();
  await seedAdmin();
}

main().catch(console.error);
