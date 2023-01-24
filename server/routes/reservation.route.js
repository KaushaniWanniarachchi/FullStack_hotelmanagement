const express = require("express");
const reservationController = require("../controllers/reservation.controller");
const asyncHandler = require("express-async-handler");
const router = express.Router();

// localhost:4050/api/reserve/
router.post("/addReservation", asyncHandler(addReserve), reserve);
router.get("/getReservation/:email", asyncHandler(getReservation));

async function getReservation(req, res) {
  await reservationController
    .getReservation(req.params.email)
    .then((reservation) => res.send(reservation));
}

async function addReserve(req, res, next) {
  const reserve = req.body;
  req.reserve = await reservationController.addReserve(reserve);
  if (!req.reserve) {
    req.msg = "Error: Reservation Entry Not Successfull";
  } else {
    req.msg = "Reservation Entry Successfully done!";
  }
  next();
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
