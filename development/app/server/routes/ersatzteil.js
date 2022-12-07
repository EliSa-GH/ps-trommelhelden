import express from "express";
import {
    getErsatzteil,
    deleteKErsatzteil,
    createErsatzteil
} from "../controllers/ersatzteil.js";

const router = express.Router();

router.get("/", getErsatz);
router.delete("/delete", deleteErsatzteil);
router.post("/create",createErsatzteil)

export default router;
