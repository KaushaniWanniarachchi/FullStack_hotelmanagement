const express = require('express');
const authRoutes = require('./auth.route');
const contactRoutes = require('./contact.route');
const priceDetailsRoutes = require('./priceDetails.route');
const contactReplyRoutes = require('./contactReply.route');
const usersRoutes = require('./users.route');
const reservationRoutes = require('./reservation.route')
const roomDetailsRoutes = require('./roomDetails.route')

const router = express.Router();

// localhost:4050/api/
router.use('/auth', authRoutes);
router.use('/contactUs', contactRoutes);
router.use('/prices', priceDetailsRoutes);
router.use('/contactReply', contactReplyRoutes);
router.use('/users', usersRoutes);
router.use('/reserve', reservationRoutes);
router.use('/room', roomDetailsRoutes);

module.exports = router;
