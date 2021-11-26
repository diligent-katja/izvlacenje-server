import express from "express";
import './config/env.js';
import cors from "cors";
import {connectDB} from "./config/db.js";
import usersRoute from './routes/api/users.js'

connectDB();

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.use('/api/users', usersRoute);

const PORT = process.env.port || 5000;

app.listen(PORT, () =>{
  console.log(`app is running at ${PORT} and in ${app.settings.env} env`)
})
