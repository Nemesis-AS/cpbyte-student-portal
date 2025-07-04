import express from "express"
import isCoordinator from "../middlewares/auth/isCoordinator.js"
import isAuthenticated from "../middlewares/auth/isAuthenticated.js"
import { addEvent, getEvents, removeEvent } from "../controllers/schedule.controller.js"

const router=express.Router()

router.get("/monthEvents",isAuthenticated, getEvents)
router.post("/addEvent",isCoordinator,addEvent)
router.post("/removeEvent",isCoordinator,removeEvent)

export default router;