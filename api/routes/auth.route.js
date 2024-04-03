import express from "express";
import { Feedcreate, getfeed, signgin, signup } from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/VerfiyUser.js";
import { verfiyAdmin } from "../utils/verfiyAdmin.js";



const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signgin);
route.post("/feedc",verifyToken, Feedcreate);
route.get("/getfeed",verifyToken,verfiyAdmin, getfeed);

export default route;
