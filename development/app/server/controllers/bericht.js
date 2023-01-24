import db from "../config/database.js";

export const getBerichte = async (req, res) => {
  try {
    const [berichte, metadata] = await db.query(
      `sp2 @etanzahl=${req.query.etAnzahl}`
    );
    if (berichte.length > 0) {
      res.status(200).json(berichte);
    } else {
      res.status(404).json({ message: "Keine Berichte gefunden" });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
