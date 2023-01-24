const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    roomCategory: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    mobileNo: { type: Number, required: true },
    email: { type: String, required: true },
    nights: { type: Number, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true }
});

module.exports = mongoose.model('Reservation', ReservationSchema);