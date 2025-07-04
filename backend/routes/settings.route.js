import express from "express";
import { editAvatar, editPass } from "../controllers/settings.controller.js";
import isAuthenticated from "../middlewares/auth/isAuthenticated.js";

const router = express.Router();

router.post("/editPass",isAuthenticated, editPass);

router.post("/editAvatar",isAuthenticated, editAvatar);

export default router;