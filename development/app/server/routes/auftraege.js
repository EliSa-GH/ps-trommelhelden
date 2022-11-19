import express from "express";
import {
  getAuftraege,
  getErlAuftraege,
  getOffenAuftraege,
} from "../controllers/auftraege.js";

const router = express.Router();

router.get("/", getAuftraege);
router.get("/erl", getErlAuftraege);
router.get("/offen", getOffenAuftraege);

export default router;
