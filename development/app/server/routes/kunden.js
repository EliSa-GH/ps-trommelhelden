import express from "express";
import {
    getKunden,
    deleteKunde,
    createKunde
} from "../controllers/kunden.js";

const router = express.Router();

router.get("/", getKunden);
router.delete("/delete", deleteKunde);
router.post("/create",createKunde)

export default router;
