const express = require("express");
const router = express.Router();

const {
    loginStudent,
    getProfile,
    updateProfile,
    changePassword,
    getMarks,
    getMyAttendance,
} = require("../controllers/studentController");

const authMiddleware = require("../middleware/authMiddleware");

//student login
router.post("/login", loginStudent);

//profile
router.get("/profile", authMiddleware, getProfile);

//update profile
router.put("/update-profile", authMiddleware, updateProfile);

//change password
router.put("/change-password", authMiddleware, changePassword);

//view marks
router.get("/marks", authMiddleware, getMarks);
router.get("/my-attendance", authMiddleware, getMyAttendance);
module.exports = router;
