import adminModel from "../api/models/adminModel.js";
// import bcryptjs from "bcryptjs";
import admin from "../api/models/adminModel.js";

const seedersAdmin = async () => {
    const existingUsers = await adminModel.find({});
    if (existingUsers.length) {
      console.log("Admin already seeded!");
      return;
    }

     //Create admin login using faker
      const adminUser = new Array(1).fill(0).map((_, index) => ({
        firstname: "shalini",
        lastname: "agrawal",
        email: "shalini.a@chapter.com",
        password: "Shalini@789", // Admin password 
        address: "Shekhar central, 913-914, 9th Floor, AB Rd, Palasia Square, Indore, Madhya Pradesh 452001",
        city: "Indore",
        country: "India",
        state : "Madhya Pradesh"
    }))

    await admin.create(adminUser);
    console.table(adminUser.map((admin) => ({ ...admin, password: "password" }))); // Print once while create admin user 
  };

export default async () => {
    await seedersAdmin();
};