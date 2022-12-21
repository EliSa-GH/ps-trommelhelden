import express from "express";

import { createMontage } from "../controllers/montage.js";

const router = express.Router();

router.post("/create", createMontage);

export default router;
