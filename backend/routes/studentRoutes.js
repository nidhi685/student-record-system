const express = require("express");
const router = express.Router();

const {
    loginStudent,
    getProfile,
    updateProfile,
    changePassword,
    getMarks,
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

module.exports = router;
