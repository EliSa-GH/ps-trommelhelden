import { request } from "https";
import Kunde from "../models/Kunde.js";
//import Kunden from "../../client/src/components/pages/Kunden.jsx";

export const getKunden = async (req, res) => {
  try {
    const kunden = await Kunde.findAll();
    res.status(200).json(kunden);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createKunde = async (req, res) => {
  try{
    console.log(req.body.params.details);
     await Kunde.create({
      KunNr:  req.body.params.details.kKunnr,
      KunName: req.body.params.details.kName, 
      KunOrt : req.body.params.details.kStreet,
      KunPlz : req.body.params.details.kZipcode,
      KunStrasse : req.body.params.details.kCity,
    
    });
    
    res.status(200).json({message: "Insert Successfully"});
  } catch (error){
    res.status(404).json({message: error.message});
  }
};