import adminModel from "../api/models/adminModel.js";
import { faker } from "@faker-js/faker";
import bcryptjs from "bcryptjs";
import admin from "../api/models/adminModel.js";

const seedersAdmin = async () => {
    const existingUsers = await adminModel.find({});
    if (existingUsers.length) {
      console.log("Admin already seeded!");
      return;
    }

    //Create admin login using faker
      const adminUser = new Array(5).fill(0).map((_, index) => ({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        password: bcryptjs.hashSync("password", 10),
        address: faker.address.city(),
        city: faker.address.city(),
    }))

    await admin.create(adminUser);
    console.table(adminUser.map((admin) => ({ ...admin, password: "password" }))); // Print once while create admin user 
  };

export default async () => {
    await seedersAdmin();
};