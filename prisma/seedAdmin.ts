import prisma from "./prismaClient";

async function seedAdmin() {
  await prisma.user.upsert({
    where: { email: "darinataranenko@gmail.com" },
    update: {},
    create: {
      email: "darinataranenko@gmail.com",
      target: "MENTOR",
      firstName: "Даріна",
      lastName: "Тараненко",
      phone: "+380960989058",
      isAdmin: true,
      scheduleStart: "09.00",
      scheduleEnd: "18.00",
      password: "Qwer*1234",
      linkedin: "https://www.linkedin.com/in/darina-taranenko-48b899146/",
      slack: "https://unkdworkspace.slack.com/team/U071E5XPX55",
      telegram: "https://t.me/tarodera",
    },
  });
  console.log("Admin seeded successfully!");
}

seedAdmin()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default seedAdmin;
