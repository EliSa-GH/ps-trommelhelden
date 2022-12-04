import express from "express";
import {
    getKunden,
    deleteKunde,
    createKunde,
    editKunde
} from "../controllers/kunden.js";

const router = express.Router();

router.get("/", getKunden);
router.delete("/delete", deleteKunde);
router.post("/create",createKunde)
router.patch("/edit", editKunde);

export default router;
