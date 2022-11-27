import express from "express";
import { getKunden, deleteKunde, editKunde } from "../controllers/kunden.js";

const router = express.Router();

router.get("/", getKunden);
router.delete("/delete", deleteKunde);
router.patch("/edit", editKunde);
export default router;
