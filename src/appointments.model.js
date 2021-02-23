const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema(
  {
    patientName: String,
    age: Number,
    gender: String,
    mobile: Number,
    date: { type: Date },
    fromTime: String,
    toTime: String,
    status: Boolean 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("appointments", appointmentSchema);
