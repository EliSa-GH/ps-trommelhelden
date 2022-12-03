import express from "express";
import { getMitarbeiter, deleteMitarbeiter, createMitarbeiter } from "../controllers/mitarbeiter.js";

const router = express.Router();

router.get("/", getMitarbeiter);
router.delete("/delete", deleteMitarbeiter);
router.post("/create",createMitarbeiter)

export default router;
