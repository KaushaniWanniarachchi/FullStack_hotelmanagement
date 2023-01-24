const Reservation = require("../models/reservation.model");

async function addReserve(reserve) {
  return await new Reservation(reserve).save();
}

async function getReservation(mail) {
  return await Reservation.find({email: mail});
}

module.exports = {
  addReserve,
  getReservation
};
