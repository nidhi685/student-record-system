import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../pages/context/AuthContext";

import {
    LayoutDashboard,
    Users,
    UserPlus,
    FileText,
    User,
    BookOpen,
    ClipboardCheck,
    BarChart3,
    Settings,
    FileSpreadsheet,
} from "lucide-react";

import {
    FaClipboardCheck,
    FaClipboardList,
    FaFileAlt,
    FaLock,
    FaUserCheck,
} from "react-icons/fa";

const Sidebar = () => {

    const { user } = useContext(AuthContext);

    const location = useLocation();

    // Active Link Style
    const linkStyle = (path) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 mb-2 font-medium text-[15px]
        
        ${location.pathname === path
            ? "bg-blue-600 text-white shadow-lg"
            : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }`;

    return (

        <div className="w-64 bg-gray-900 text-white h-screen shadow-xl flex flex-col overflow-y-auto scrollbar-hide">

            {/* Top Section */}
            <div className="p-5">

                {/* Logo */}
                <div className="mb-8 border-b border-gray-800 pb-5">

                    <h2 className="text-3xl font-bold tracking-wide">
                        Student ERP
                    </h2>

                    <p className="text-gray-400 text-sm mt-1">
                        Management System
                    </p>

                </div>

                {/* ================= ADMIN MENU ================= */}
                {user?.role === "admin" && (

                    <div>

                        <p className="text-gray-500 text-xs uppercase mb-4 tracking-widest">
                            Admin Menu
                        </p>

                        {/* Dashboard */}
                        <Link
                            to="/dashboard"
                            className={linkStyle("/dashboard")}
                        >
                            <LayoutDashboard size={20} />
                            Dashboard
                        </Link>

                        {/* Students */}
                        <Link
                            to="/students"
                            className={linkStyle("/students")}
                        >
                            <Users size={20} />
                            Students
                        </Link>

                        {/* Add Student */}
                        <Link
                            to="/add-student"
                            className={linkStyle("/add-student")}
                        >
                            <UserPlus size={20} />
                            Add Student
                        </Link>

                        {/* Subjects */}
                        <Link
                            to="/subjects"
                            className={linkStyle("/subjects")}
                        >
                            <BookOpen size={20} />
                            Subjects
                        </Link>

                        {/* Add Attendance */}
                        <Link
                            to="/attendance"
                            className={linkStyle("/attendance")}
                        >
                            <FaUserCheck size={18} />
                            Add Attendance
                        </Link>

                        {/* Attendance List */}
                        <Link
                            to="/attendance-list"
                            className={linkStyle("/attendance-list")}
                        >
                            <FaClipboardCheck size={18} />
                            Attendance List
                        </Link>

                        {/* Add Marks */}
                        <Link
                            to="/add-marks"
                            className={linkStyle("/add-marks")}
                        >
                            <FileText size={20} />
                            Add Marks
                        </Link>

                        {/* View Marks */}
                        <Link
                            to="/marks"
                            className={linkStyle("/marks")}
                        >
                            <FaClipboardList size={18} />
                            View Marks
                        </Link>

                        {/* Results */}
                        <Link
                            to="/results"
                            className={linkStyle("/results")}
                        >
                            <BarChart3 size={20} />
                            Results
                        </Link>

                        {/* Reports */}
                        <Link
                            to="/reports"
                            className={linkStyle("/reports")}
                        >
                            <FileSpreadsheet size={20} />
                            Reports
                        </Link>

                        {/* Settings */}
                        <Link
                            to="/settings"
                            className={linkStyle("/settings")}
                        >
                            <Settings size={20} />
                            Settings
                        </Link>

                    </div>
                )}

                {/* ================= STUDENT MENU ================= */}
                {user?.role === "student" && (

                    <div>

                        <p className="text-gray-500 text-xs uppercase mb-4 tracking-widest">
                            Student Menu
                        </p>

                        {/* Dashboard */}
                        <Link
                            to="/student-dashboard"
                            className={linkStyle("/student-dashboard")}
                        >
                            <LayoutDashboard size={20} />
                            Dashboard
                        </Link>

                        {/* Profile */}
                        <Link
                            to="/profile"
                            className={linkStyle("/profile")}
                        >
                            <User size={20} />
                            My Profile
                        </Link>

                        {/* My Marks */}
                        <Link
                            to="/my-marks"
                            className={linkStyle("/my-marks")}
                        >
                            <FaFileAlt size={18} />
                            My Marks
                        </Link>

                        {/* My Attendance */}
                        <Link
                            to="/my-attendance"
                            className={linkStyle("/my-attendance")}
                        >
                            <ClipboardCheck size={18} />
                            My Attendance
                        </Link>

                        {/* My Results */}
                        <Link
                            to="/my-results"
                            className={linkStyle("/my-results")}
                        >
                            <BarChart3 size={18} />
                            My Results
                        </Link>

                        {/* Change Password */}
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

        </div>
    );
};

export default Sidebar;