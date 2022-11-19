import express from "express";
import { getMitarbeiter } from "../controllers/mitarbeiter.js";

const router = express.Router();

router.get("/", getMitarbeiter);

export default router;
