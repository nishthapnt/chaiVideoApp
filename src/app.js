import express from "express";
import cors from "cors"; //config using use
import cookieParser from "cookie-parser";

const app = express();
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

//to limit incoming json data
app.use(express.json({ limit: "20kb" })); // no need of body parser now

app.use(express.urlencoded({ extended: true, limit: "20kb" })); // for nested objects extended:true

app.use(express.static("public")); //to store public assets in server (public/temp)

app.use(cookieParser());

//routes import

import userRouter from  "./routes/user.routes.js";


//routes declaration
app.use("/api/v1/users", userRouter); //v1 means version 1 of api, in future if we want to change api we can create v2 and so on






export { app };
