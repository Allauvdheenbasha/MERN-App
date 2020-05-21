const mongoose = require("mongoose");

const checkObjectID = (idToCheck) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
    return res.status(401).json({ msg: "Invalid ID" });
  next();
  
};

module.exports = checkObjectID;
