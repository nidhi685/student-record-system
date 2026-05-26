const Student = require("../models/Student");
const Marks = require("../models/Marks");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

//student login
exports.loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(400).json({
                success: false,
                message: "Student not found",
            });
        }

        const isMatch = await bcrypt.compare(password, student.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            });
        }

        const token = generateToken();
        student.token = token;
        await student.save();

        res.json({
            success: true,
            message: "Login successful",
            token,
            student,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//view profile
exports.getProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.user._id).select(
            "-password -token",
        );
        res.json({
            success: true,
            student,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//update profile
exports.updateProfile = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.user._id,
            req.body,
            { new: true },
        ).select("-password -token");

        res.json({
            success: true,
            message: "Profile updated successfully",
            student,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//change password
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const student = await Student.findById(req.user._id);
        const isMatch = await bcrypt.compare(oldPassword, student.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Old password incorrect",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        student.password = hashedPassword;
        await student.save();

        res.json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//view marks
exports.getMarks = async (req, res) => {
    try {
        const marks = await Marks.find({
            studentId: req.user._id,
        });

        res.json({
            success: true,
            marks,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
