import express from "express";
import { allAttendance, checkStatus, markAttendance, memberOfDomain, updateStatus } from "../controllers/coordinator.controller.js";
import isCoordinator from "../middlewares/auth/isCoordinator.js";

const router = express.Router();

router.get("/attendance",isCoordinator, allAttendance);
router.post("/markAttendance",isCoordinator, markAttendance);
router.post("/checkStatus",isCoordinator, checkStatus)
router.post("/updateStatus",isCoordinator, updateStatus)
router.get("/memberOfDomain",isCoordinator, memberOfDomain);

export default router;