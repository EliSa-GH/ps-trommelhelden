import express from "express";
import { getKunden } from "../controllers/kunden.js";

const router = express.Router();

router.get("/", getKunden);

export default router;
