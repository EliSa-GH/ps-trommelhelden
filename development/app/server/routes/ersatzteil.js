import express from "express";
import {
    getErsatzteil,
    deleteErsatzteil,
    createErsatzteil,
    editErsatzteil,
} from "../controllers/ersatzteil.js";

const router = express.Router();

router.get("/", getErsatzteil);
router.delete("/delete", deleteErsatzteil);
router.post("/create",createErsatzteil);
router.patch("/edit", editErsatzteil);


export default router;
