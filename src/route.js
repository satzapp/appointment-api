const express = require("express");
const appointment = require('./controller');
const router = express.Router();

router.get('/appointments', appointment.appointmentList);
router.post('/appointment', (req, res) => {
  appointment.appointmentBooking(req, res)
});

module.exports = router;