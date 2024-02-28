import express from "express";
import {connection} from "./database/connection.js";
import pushNotificationRoute from "./routes/pushNotificationRoute.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
dotenv.config()
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.json({ limit:'Infinity'}));
app.use(cookieParser()) 


await connection();

app.use(cors({origin:'http://localhost:3000',credentials:true}));

//Routes
app.use("/notification", pushNotificationRoute)

app.listen(PORT, () => {
  console.log(`Server is started on ${PORT}`);
});
