const { hashSync } = require("bcrypt");
const { prisma } = require("../lib/prisma");

(async function () {
  // Create roles
  const roles = ["admin", "user"];
  for (const role_name of roles) {
    await prisma.role.create({
      data: {
        role_name,
      },
    });
  }
  const password = hashSync("12345", 12);
  await prisma.user.create({
    data: {
      name: "Administrator",
      email: "admin@mail.io",
      password,
      role_id: 1,
    },
  });
  console.log("Administrator successfully created!");
})();
