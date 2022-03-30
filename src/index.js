import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from 'http';
import router from './api/routes/v1/index.js';
import seeders from "./seeders/admin.js"
dotenv.config();

// express code 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect router
app.use('/v1', router);

// mongodb connection code
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connected successfully"))
  seeders()
  .catch(console.log);

//  create a server code 
const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
