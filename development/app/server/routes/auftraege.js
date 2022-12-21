import express from "express";
import {
  getAllAuftraege,
  getNewAuftraege,
  getErlAuftraege,
  getOffenAuftraege,
  deleteAuftraege,
  setAuftragMitarbeiter,
  editAuftrag,
  createAuftrag,
  createAuftragWithoutTrigger,
} from "../controllers/auftraege.js";

const router = express.Router();

router.get("/", getNewAuftraege);
router.get("/all", getAllAuftraege);
router.get("/erl", getErlAuftraege);
router.get("/offen", getOffenAuftraege);
router.delete("/delete", deleteAuftraege);
router.post("/assign", setAuftragMitarbeiter);
router.patch("/edit", editAuftrag);
router.post("/create", createAuftrag);
router.post("/createWithoutTrigger", createAuftragWithoutTrigger);

export default router;
