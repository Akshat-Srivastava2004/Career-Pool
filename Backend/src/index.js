import dotenv from "dotenv";

import connectDB from "./Database/index.js";
import { app } from "./app.js";
dotenv.config({ path: "./.env" });
import process from "process"



connectDB()
    .then(() => {
        app.listen(process.env.PORT || 6000, () => {
            console.log(`Server is running at port: ${process.env.PORT || 6000}`);
           
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed !!!", err);
    });
