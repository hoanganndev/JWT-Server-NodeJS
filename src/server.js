import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
import express from "express";
import configViewEngine from "./config/viewEngine";
import initApiRoutes from "./routers/api";
import connection from "./config/connectDB";
import configCors from "./config/cors";
require("dotenv").config();
const app = express();
//config cors
configCors(app);
//config view engine
configViewEngine(app);
//config body-parser like a middleware before run in web routes below
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Test connection db
connection();
//config cookieParser
//app.use(cookieParser());
//init Api routes
initApiRoutes(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(">>> server is running on the port" + PORT);
});
