import express from "express";
import http from "http";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import router from "./api/routes/index.js";
import session from "express-session";
import mongoose from "mongoose";
import dotenv from "dotenv";

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

const app = express();

app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connected successfully"))
  .catch(console.log);

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
