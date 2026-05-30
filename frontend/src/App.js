import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/admin/Dashboard";
import StudentList from "./pages/admin/StudentList";
import AddStudent from "./pages/admin/AddStudent";
import EditStudent from "./pages/admin/EditStudent";
import ViewStudent from "./pages/admin/ViewStudent";
import AddMarks from "./pages/admin/AddMarks";
import MarksList from "./pages/admin/MarksList";
import Subjects from "./pages/admin/Subjects";
import Attendance from "./pages/admin/Attendence";
import Results from "./pages/admin/Results";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

import StudentDashboard from "./pages/student/StudentDashboard";
import MyProfile from "./pages/student/MyProfile";
import EditProfile from "./pages/student/EditProfile";
import MyMarks from "./pages/student/MyMarks";
import ChangePassword from "./pages/student/ChangePassword";
import AttendanceList from "./pages/admin/AttendanceList";
import MyAttendance from "./pages/student/MyAttendance";
import MyResults from "./pages/student/MyResults";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/register" element={<Register />} />

            {/* Admin */}

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/students" element={<StudentList />} />

            <Route path="/add-student" element={<AddStudent />} />

            <Route path="/edit-student/:id" element={<EditStudent />} />

            <Route path="/view-student/:id" element={<ViewStudent />} />
            <Route path="/add-marks" element={<AddMarks />} />
            <Route path="/marks" element={<MarksList />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/attendance-list" element={<AttendanceList />} />
            <Route path="/results" element={<Results />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />

            {/* Student */}

            <Route path="/student-dashboard" element={<StudentDashboard />} />

            <Route path="/profile" element={<MyProfile />} />

            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/my-marks" element={<MyMarks />} />

            <Route path="/my-attendance" element={<MyAttendance />} />

            <Route path="/my-results" element={<MyResults />} />
            <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
    );
}

export default App;
