import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../pages/context/AuthContext";
import { FaClipboardList, FaFileAlt, FaLock } from "react-icons/fa";
import {
    LayoutDashboard,
    Users,
    UserPlus,
    FileText,
    User,
} from "lucide-react";

const Sidebar = () => {

    const { user } = useContext(AuthContext);

    const location = useLocation();

    // Active Link Style
    const linkStyle = (path) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition mb-2 font-medium
        ${location.pathname === path
            ? "bg-blue-600 text-white"
            : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }`;

    return (

        <div className="w-64 bg-gray-900 text-white min-h-screen p-5 shadow-lg">

            {/* Logo */}
            <div className="mb-8">

                <h2 className="text-2xl font-bold tracking-wide">
                    Student ERP
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                    Management System
                </p>

            </div>

            {/* ADMIN MENU */}
            {user?.role === "admin" && (

                <div>

                    <p className="text-gray-400 text-xs uppercase mb-3">
                        Admin Menu
                    </p>

                    <Link
                        to="/dashboard"
                        className={linkStyle("/dashboard")}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>

                    <Link
                        to="/students"
                        className={linkStyle("/students")}
                    >
                        <Users size={20} />
                        Students
                    </Link>

                    <Link
                        to="/add-student"
                        className={linkStyle("/add-student")}
                    >
                        <UserPlus size={20} />
                        Add Student
                    </Link>

                    <Link
                        to="/add-marks"
                        className={linkStyle("/add-marks")}
                    >
                        <FileText size={20} />
                        Add Marks
                    </Link>
                    <Link
                        to="/marks"
                        className={linkStyle("/marks")}
                    >
                        <FaClipboardList size={18} />
                        View Marks
                    </Link>
                </div>
            )}

            {/* STUDENT MENU */}
            {user?.role === "student" && (

                <div>

                    <p className="text-gray-400 text-xs uppercase mb-3">
                        Student Menu
                    </p>

                    <Link
                        to="/student-dashboard"
                        className={linkStyle("/student-dashboard")}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>

                    <Link
                        to="/profile"
                        className={linkStyle("/profile")}
                    >
                        <User size={20} />
                        My Profile
                    </Link>
                    <Link
                        to="/my-marks"
                        className={linkStyle("/my-marks")}
                    >
                        <FaFileAlt size={18} />
                        My Marks
                    </Link>
                    <Link
                        to="/change-password"
                        className={linkStyle("/change-password")}
                    >
                        <FaLock size={18} />
                        Change Password
                    </Link>

                </div>
            )}

        </div>
    );
};

export default Sidebar;