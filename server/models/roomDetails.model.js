const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomCategory: { type: String, required: true },
  availableCount: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Room", RoomSchema);
