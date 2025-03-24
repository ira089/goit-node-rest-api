import prisma from "./prismaClient";

async function seedAdmin() {
  await prisma.user.upsert({
    where: { email: "darinataranenko@gmail.com" },
    update: {},
    create: {
      email: "darinataranenko@gmail.com",
      target: "MENTOR",
      firstName: "",
      lastName: "",
      phone: "",
      isAdmin: true,
      scheduleStart: "",
      scheduleEnd: "",
    },
  });
}

export default seedAdmin;
