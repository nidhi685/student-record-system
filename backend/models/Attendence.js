const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },

  semester: {
    type: Number,
    required: true,
  },

  percentage: {
    type: Number,
    required: true,
  },

}, { timestamps: true });

module.exports = mongoose.model(
  "Attendance",
  attendanceSchema
);