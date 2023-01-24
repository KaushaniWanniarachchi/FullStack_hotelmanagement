const express = require("express");
const roomDetailsController = require("../controllers/roomDetails.controller");
const asyncHandler = require("express-async-handler");
const router = express.Router();

// localhost:4050/api/room/
router.get("/getAllRoom", asyncHandler(getAllRoom));
router.put("/updateRoom", roomDetailsController.updateRoomCount);

async function getAllRoom(req, res) {
  await roomDetailsController.getAllRoom().then((rooms) => res.send(rooms));
}

function reserve(req, res) {
  const reserve = req.reserve;
  const msg = req.msg;
  res.json({
    reserve,
    msg,
  });
}

function msg(req, res) {
  const msg = req.msg;
  res.json({
    msg,
  });
}

module.exports = router;
