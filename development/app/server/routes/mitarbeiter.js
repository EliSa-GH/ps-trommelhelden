import express from "express";
import { getMitarbeiter, deleteMitarbeiter } from "../controllers/mitarbeiter.js";

const router = express.Router();

router.get("/", getMitarbeiter);
router.delete("/delete", deleteMitarbeiter);

export default router;
