const Appointment = require("./appointments.model");
const joi = require("joi");
const moment = require('moment');
module.exports = {
  appointmentList: async (req, res) => {
    try {
      var appointmentList;
      
      // fillter by date
      if (req.query.date !== undefined) {
        // date reformating
        let reqDate = moment(req.query.date).format('YYYY-MM-DD[T00:00:00.000Z]');
        appointmentList = await Appointment.find({ date: reqDate });
      } else {
        appointmentList = await Appointment.find();
      }

      return res.status(200).send({
        code: 200,
        errors: false,
        data: appointmentList,
      });
    } catch (err) {
      return res.status(500).send({
        code: 500,
        errors: true,
        data: {
          type: "appointment",
          attributes: err.message,
        },
      });
    }
  },

  validatBooking: (req) => {
    let schema = joi.object().keys({
      patientName: joi.string().required(),
      age: joi.number().required(),
      mobile: joi.string().required(),
      gender: joi.string().optional(),
      date: joi.string().required(),
      fromTime: joi.string().required(),
      toTime: joi.string().required(),
      status: joi.optional(),
    });

    return schema.validate(req, { abortEarly: false }).error;
  },

  appointmentBooking: async (req, res) => {
    try {
      let error = await module.exports.validatBooking(req.body);
      if (error) {
        let errors = await module.exports.errorFormat(error);
        return res.status(200).send(errors);
      }

      let payload = {
        patientName: req.body.patientName,
        age: req.body.age,
        gender: req.body.gender,
        mobile: req.body.mobile,
        date: req.body.date,
        fromTime: req.body.fromTime,
        toTime: req.body.toTime,
        status: req.body.status,
      };

      const appointment = new Appointment(payload);

      await appointment.save();

      return res.status(200).send({
        code: 200,
        errors: false,
        data: {
          attributes: {
            message: "Appointment booked successfully!",
            data: appointment,
          },
        },
      });
    } catch (err) {
      return res.status(500).send({
        code: 500,
        errors: true,
        data: {
          type: "appointment",
          attributes: err.message,
        },
      });
    }
  },
  
  checkBookingSlot: async (data) => {
    let checkingSlot = await Appointment.find({
      date: data.date,
      fromTime: {
        lte: data.fromTime,
        gte: data.toTime
      }
    });
    return checkingSlot.length ? true : false;
  },

  errorFormat: (error) => {
    var errors = {};
    if (error) {
      error.details.forEach((detail) => {
        errors[detail.path] = detail.message;
      });
    }
    return errors;
  },
};
