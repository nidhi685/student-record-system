const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
  },

  subjectCode: {
    type: String,
    required: true,
  },
   course: {
      type: String,
      required: true,
    },

  semester: {
      type: Number,
      required: true,
    },
});

module.exports = mongoose.model("Subject", subjectSchema);