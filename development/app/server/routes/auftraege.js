import express from "express";
import { getAuftraege } from "../controllers/auftraege.js";

const router = express.Router();

router.get("/", getAuftraege);

export default router;
