import express from "express";
import {
  getNewAuftraege,
  getErlAuftraege,
  getOffenAuftraege,
  deleteAuftraege,
  setAuftragMitarbeiter,
  editAuftrag,
  createAuftrag,
} from "../controllers/auftraege.js";

const router = express.Router();

router.get("/", getNewAuftraege);
router.get("/erl", getErlAuftraege);
router.get("/offen", getOffenAuftraege);
router.delete("/delete", deleteAuftraege);
router.post("/assign", setAuftragMitarbeiter);
router.patch("/edit", editAuftrag);
router.post("/create", createAuftrag);

export default router;
