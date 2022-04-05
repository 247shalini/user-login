import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from 'http';
import router from './api/routes/v1/index.js';
import seeders from "./seeders/admin.js"
import session from "express-session";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
dotenv.config();

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

// express code 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect router
app.use('/v1', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

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
