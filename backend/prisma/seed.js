import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  const users = [
    // USERS
    {
      name: "User One",
      library_id: "LIB100001",
      email: "user1@example.com",
      role: "USER",
      domain_dev: "ANDROID",
      domain_dsa: "CPP",
      year: 1,
    },
    {
      name: "User Two",
      library_id: "LIB100002",
      email: "user2@example.com",
      role: "USER",
      domain_dev: "ARVR",
      domain_dsa: "JAVA",
      year: 2,
    },
    {
      name: "User Three",
      library_id: "LIB100003",
      email: "user3@example.com",
      role: "USER",
      domain_dev: "ML",
      domain_dsa: "CPP",
      year: 3,
    },
    {
      name: "User Four",
      library_id: "LIB100004",
      email: "user4@example.com",
      role: "USER",
      domain_dev: "WEBDEV",
      domain_dsa: "JAVA",
      year: 2,
    },
    {
      name: "User Five",
      library_id: "LIB100005",
      email: "user5@example.com",
      role: "USER",
      domain_dev: "UIUX",
      domain_dsa: "CPP",
      year: 4,
    },

    // COORDINATORS
    {
      name: "Coord One",
      library_id: "LIB100006",
      email: "coord1@example.com",
      role: "COORDINATOR",
      domain_dev: "ANDROID",
      domain_dsa: "JAVA",
      year: 3,
    },
    {
      name: "Coord Two",
      library_id: "LIB100007",
      email: "coord2@example.com",
      role: "COORDINATOR",
      domain_dev: "ARVR",
      domain_dsa: "CPP",
      year: 2,
    },
    {
      name: "Coord Three",
      library_id: "LIB100008",
      email: "coord3@example.com",
      role: "COORDINATOR",
      domain_dev: "ML",
      domain_dsa: "JAVA",
      year: 1,
    },
    {
      name: "Coord Four",
      library_id: "LIB100009",
      email: "coord4@example.com",
      role: "COORDINATOR",
      domain_dev: "WEBDEV",
      domain_dsa: "CPP",
      year: 4,
    },
    {
      name: "Coord Five",
      library_id: "LIB100010",
      email: "coord5@example.com",
      role: "COORDINATOR",
      domain_dev: "UIUX",
      domain_dsa: "JAVA",
      year: 3,
    },

    // LEADS
    {
      name: "Lead One",
      library_id: "LIB100011",
      email: "lead1@example.com",
      role: "LEAD",
      domain_dev: "ANDROID",
      domain_dsa: "CPP",
      year: 2,
    },
    {
      name: "Lead Two",
      library_id: "LIB100012",
      email: "lead2@example.com",
      role: "LEAD",
      domain_dev: "ARVR",
      domain_dsa: "JAVA",
      year: 4,
    },
    {
      name: "Lead Three",
      library_id: "LIB100013",
      email: "lead3@example.com",
      role: "LEAD",
      domain_dev: "ML",
      domain_dsa: "CPP",
      year: 3,
    },
    {
      name: "Lead Four",
      library_id: "LIB100014",
      email: "lead4@example.com",
      role: "LEAD",
      domain_dev: "WEBDEV",
      domain_dsa: "JAVA",
      year: 2,
    },
    {
      name: "Lead Five",
      library_id: "LIB100015",
      email: "lead5@example.com",
      role: "LEAD",
      domain_dev: "UIUX",
      domain_dsa: "CPP",
      year: 1,
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  console.log("✅ Seeded 15 users successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding users:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
