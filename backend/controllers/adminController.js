const Admin = require("../models/Admin");
const Student = require("../models/Student");
const Marks = require("../models/Marks");
const Attendance = require("../models/Attendence");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

//admin register

exports.registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({
            name,
            email,
            password: hashedPassword,
        });

        await admin.save();

        res.status(201).json({
            success: true,
            message: "Admin registered successfully",
            admin,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//admin login
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: "Invalid email",
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            });
        }

        const token = generateToken();

        admin.token = token;
        await admin.save();

        res.json({
            success: true,
            message: "Login successful",
            token,
            admin,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//add student
exports.addStudent = async (req, res) => {
    try {
        const {
            name,
            enrollment,
            email,
            mobile,
            course,
            semester,
            address,
            password,
        } = req.body;

        const studentExists = await Student.findOne({
            $or: [{ email }, { enrollment }],
        });

        if (studentExists) {
            return res.status(400).json({
                message: "Student already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = new Student({
            name,
            enrollment,
            email,
            mobile,
            course,
            semester,
            address,
            password: hashedPassword,
        });

        await student.save();

        res.status(201).json({
            success: true,
            message: "Student added successfully",
            student,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get student
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find().select("-password -token");

        res.json({
            success: true,
            count: students.length,
            students,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get single student
exports.getSingleStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).select(
            "-password -token",
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        res.json({
            success: true,
            student,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//update student
exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
            new: true,
        }).select("-password -token");

        res.json({
            success: true,
            message: "Student updated successfully",
            updatedStudent,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete student
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        await Student.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Student deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//dashboard data
// DASHBOARD DATA
exports.getDashboard = async (req, res) => {

    try {

        // TOTAL STUDENTS
        const totalStudents =
            await Student.countDocuments();

        // TOTAL MARKS RECORDS
        const totalMarks =
            await Marks.countDocuments();

        // AVERAGE MARKS
        const marksData =
            await Marks.find();

        let averageMarks = 0;

        if (marksData.length > 0) {

            const total = marksData.reduce(
                (acc, item) =>
                    acc + item.marks,
                0
            );

            averageMarks =
                (total / marksData.length)
                .toFixed(1);
        }

        // TOTAL COURSES
        const courses =
            await Student.distinct("course");

        const totalCourses =
            courses.length;

        // RECENT STUDENTS
        const recentStudents =
            await Student.find()
                .sort({ createdAt: -1 })
                .limit(5);

        res.json({

            success: true,

            totalStudents,

            totalMarks,

            averageMarks,

            totalCourses,

            recentStudents,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};

//search student
exports.searchStudent = async (req, res) => {
    try {
        const { keyword } = req.query;
        const students = await Student.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { enrollment: { $regex: keyword, $options: "i" } },
                { email: { $regex: keyword, $options: "i" } },
            ],
        }).select("-password -token");

        res.json({
            success: true,
            students,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

//add marks
exports.addMarks = async (req, res) => {
    try {
        const { studentId, subject, marks, grade } = req.body;

        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        const newMarks = new Marks({
            studentId,
            subject,
            marks,
            grade,
        });

        await newMarks.save();

        res.json({
            success: true,
            message: "Marks added successfully",
            newMarks,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL MARKS
exports.getAllMarks = async (req, res) => {

    try {

        const marks = await Marks.find()
            .populate(
                "studentId",
                "name enrollment course"
            );

        // console.log(marks);

        res.json({
            success: true,
            marks,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message,
        });
    }
};


// ================= RESULT ANALYTICS =================
exports.getResultAnalytics = async (req, res) => {

    try {

        const marks = await Marks.find()
            .populate("studentId");

        let passStudents = 0;
        let failStudents = 0;

        let topper = "";
        let topperPercentage = 0;

        const studentResults = {};

        marks.forEach((mark) => {

            const studentId = mark.studentId._id;

            if (!studentResults[studentId]) {

                studentResults[studentId] = {
                    name: mark.studentId.name,
                    total: 0,
                    count: 0,
                };
            }

            studentResults[studentId].total += mark.marks;

            studentResults[studentId].count += 1;
        });

        Object.values(studentResults).forEach((student) => {

            const percentage =
                student.total / student.count;

            if (percentage >= 35) {
                passStudents++;
            } else {
                failStudents++;
            }

            if (percentage > topperPercentage) {

                topperPercentage = percentage;

                topper = student.name;
            }
        });

        res.status(200).json({
            passStudents,
            failStudents,
            topper,
            topperPercentage:
                topperPercentage.toFixed(2),
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// ================= REPORTS =================
exports.getReports = async (req, res) => {

    try {

        const marks = await Marks.find()
            .populate("studentId");

        const studentResults = {};

        marks.forEach((mark) => {

            const studentId = mark.studentId._id;

            if (!studentResults[studentId]) {

                studentResults[studentId] = {
                    studentName: mark.studentId.name,
                    course: mark.studentId.course,
                    total: 0,
                    count: 0,
                };
            }

            studentResults[studentId].total += mark.marks;

            studentResults[studentId].count += 1;
        });

        const reports = Object.values(studentResults)
            .map((student) => {

                const percentage =
                    student.total / student.count;

                let grade = "F";

                if (percentage >= 80) {
                    grade = "A";
                } else if (percentage >= 60) {
                    grade = "B";
                } else if (percentage >= 35) {
                    grade = "C";
                }

                return {
                    studentName: student.studentName,
                    course: student.course,
                    percentage:
                        percentage.toFixed(2),
                    grade,
                };
            });

        res.status(200).json(reports);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// ================= GET ADMIN PROFILE =================
exports.getAdminProfile = async (req, res) => {

    try {

        const admin = await Admin.findById(
            req.user.id
        ).select("-password");

        res.status(200).json(admin);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// ================= UPDATE ADMIN PROFILE =================
exports.updateAdminProfile = async (req, res) => {

    try {

        const { name, email } = req.body;

        const updatedAdmin =
            await Admin.findByIdAndUpdate(
                req.user.id,
                {
                    name,
                    email,
                },
                { new: true }
            );

        res.status(200).json({
            message:
                "Profile Updated Successfully",
            updatedAdmin,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// ================= ADD ATTENDANCE =================
exports.addAttendance = async (req, res) => {

    try {

        const {
            studentId,
            subject,
            percentage,
        } = req.body;

        const attendance =
            await Attendance.create({
                studentId,
                subject,
                percentage,
            });

        res.status(201).json({
            message:
                "Attendance Added Successfully",
            attendance,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

exports.getAttendance = async (req, res) => {

  try {

    const attendance = await Attendance.find()
      .populate(
        "studentId",
        "name course"
      );

    res.status(200).json({
      success: true,
      attendance,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};