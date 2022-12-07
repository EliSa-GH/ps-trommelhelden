import express from "express";
import {
    getErsatzteil,
    deleteErsatzteil,
    createErsatzteil
} from "../controllers/ersatzteil.js";

const router = express.Router();

router.get("/", getErsatzteil);
router.delete("/delete", deleteErsatzteil);
router.post("/create",createErsatzteil)

export default router;
