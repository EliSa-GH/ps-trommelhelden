import express from "express";
import {
    getKunden,
    deleteKunde
} from "../controllers/kunden.js";

const router = express.Router();

router.get("/", getKunden);
router.delete("/delete", deleteKunde);

export default router;
