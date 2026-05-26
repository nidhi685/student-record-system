const express = require("express");
const router = express.Router();

const {
    registerAdmin,
    loginAdmin,
    addStudent,
    getStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent,
    getDashboard,
    searchStudent,
    addMarks,
    getAllMarks
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");

//admin routes

//admin register
router.post("/register", registerAdmin);

//admin login
router.post("/login", loginAdmin);

//student manage from admin

//add student
router.post("/add-student", authMiddleware, addStudent);

//get all students
router.get("/students", authMiddleware, getStudents);

//get single student
router.get("/student/:id", authMiddleware, getSingleStudent);

//update student
router.put("/update-student/:id", authMiddleware, updateStudent);

//delete student
router.delete("/delete-student/:id", authMiddleware, deleteStudent);

//dashboard
router.get("/dashboard", authMiddleware, getDashboard);

//search student
router.get("/search-student", authMiddleware, searchStudent);

//add marks
router.post("/add-marks", authMiddleware, addMarks);

//get all student marks
router.get("/marks", getAllMarks);

module.exports = router;
