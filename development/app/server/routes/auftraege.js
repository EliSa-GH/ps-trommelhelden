import express from "express";
import {
  getNewAuftraege,
  getErlAuftraege,
  getOffenAuftraege,
} from "../controllers/auftraege.js";

const router = express.Router();

router.get("/", getNewAuftraege);
router.get("/erl", getErlAuftraege);
router.get("/offen", getOffenAuftraege);

export default router;
