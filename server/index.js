import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import { router } from "./routes/route.js";

dotenv.config();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
// app.use( "/api", router);

app.get("/ping", (req, res)=>{
    res.send("pong");
})

app.listen(port, () => {
    console.log(`listening on port ${port}...`);
})

/*
* Routes:
* api/users/signup
* api/users/login
* api/users:id
* */