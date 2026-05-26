const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        enrollment: {
            type: String,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        mobile: {
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

        address: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },

        token: {
            type: String,
            default: null,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Student",studentSchema)