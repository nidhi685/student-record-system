const Admin = require("../models/Admin");
const Student = require("../models/Student");

const authMiddleware = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({
                message: "No token Provided"
            });
        }

        const token = authHeader.split(" ")[1];

        // Check Admin
        let admin = await Admin.findOne({ token });

        if (admin) {

            req.user = admin;
            req.role = "admin";

            return next();
        }

        // Check Student
        let student = await Student.findOne({ token });

        if (student) {

            req.user = student;
            req.role = "student";

            return next();
        }

        return res.status(401).json({
            message: "Invalid token"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = authMiddleware;