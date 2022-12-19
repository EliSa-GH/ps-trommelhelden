import express from "express";
import { getMitarbeiter, deleteMitarbeiter, createMitarbeiter, editMitarbeiter } from "../controllers/mitarbeiter.js";

const router = express.Router();

router.get("/", getMitarbeiter);
router.delete("/delete", deleteMitarbeiter);
router.post("/create",createMitarbeiter);
router.patch("/edit", editMitarbeiter);


export default router;
