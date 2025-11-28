import { Router } from "express";
import { getVolunteers, createVolunteer } from "../controllers/volunteersController";
const router = Router();

router.get("/", getVolunteers);
router.post("/", createVolunteer);

export default router;
