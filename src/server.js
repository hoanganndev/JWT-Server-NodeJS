import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import connection from "./config/connectDB";
import configCors from "./config/cors";
import configViewEngine from "./config/viewEngine";
import initApiRoutes from "./routers/api";
require("dotenv").config();
const app = express();
//🔥 Config cors
configCors(app);
//🔥 Config view engine
configViewEngine(app);
//🔥 Config body-parser like a middleware before run in web routes below
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//🔥 Test connection db
connection();
//🔥 Config cookieParser ahead of file routes
app.use(cookieParser());
//🔥 Init Api routes
initApiRoutes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(">>> server is running on the port" + PORT);
});
