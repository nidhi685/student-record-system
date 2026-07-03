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
    getAllMarks,
    getResultAnalytics,
    getReports,
    getAdminProfile,
    updateAdminProfile,
    addAttendance,
    getAttendance,
    addSubject,
    getSubjects,
    downloadReport,
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
router.get("/results-analytics", authMiddleware, getResultAnalytics);

router.get("/reports", authMiddleware, getReports);

router.get("/profile", authMiddleware, getAdminProfile);

router.put("/update-profile", authMiddleware, updateAdminProfile);
router.post("/add-attendance", authMiddleware, addAttendance);
router.get("/attendance", authMiddleware, getAttendance);

router.post("/add-subject", authMiddleware, addSubject);

router.get("/subjects", authMiddleware, getSubjects);
router.get("/reports/download/:id", authMiddleware, downloadReport);
module.exports = router;
