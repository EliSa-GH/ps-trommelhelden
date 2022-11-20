import express from "express";
import {
  getNewAuftraege,
  getErlAuftraege,
  getOffenAuftraege,
  deleteAuftraege,
} from "../controllers/auftraege.js";

const router = express.Router();

router.get("/", getNewAuftraege);
router.get("/erl", getErlAuftraege);
router.get("/offen", getOffenAuftraege);
router.delete("/delete", deleteAuftraege);

export default router;
