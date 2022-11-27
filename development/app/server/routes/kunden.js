import express from "express";
import { getKunden, createKunde } from "../controllers/kunden.js";

const router = express.Router();

router.get("/", getKunden);
router.post("/create",createKunde)

export default router;
