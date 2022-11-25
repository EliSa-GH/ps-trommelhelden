import express from "express";
import {
  getNewAuftraege,
  getErlAuftraege,
  getOffenAuftraege,
  deleteAuftraege,
  setAuftragMitarbeiter,
  editAuftrag,
} from "../controllers/auftraege.js";

const router = express.Router();

router.get("/", getNewAuftraege);
router.get("/erl", getErlAuftraege);
router.get("/offen", getOffenAuftraege);
router.delete("/delete", deleteAuftraege);
router.post("/assign", setAuftragMitarbeiter);
router.patch("/edit", editAuftrag);

export default router;
