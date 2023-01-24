import express from "express";
import { getBerichte } from "../controllers/bericht.js";

const router = express.Router();

router.get("/", getBerichte);

export default router;
