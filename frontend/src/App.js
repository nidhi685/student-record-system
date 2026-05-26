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

import StudentDashboard from "./pages/student/StudentDashboard";
import MyProfile from "./pages/student/MyProfile";
import EditProfile from "./pages/student/EditProfile";
import MyMarks from "./pages/student/MyMarks";
import ChangePassword from "./pages/student/ChangePassword";

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

            {/* Student */}

            <Route path="/student-dashboard" element={<StudentDashboard />} />

            <Route path="/profile" element={<MyProfile />} />

            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/my-marks" element={<MyMarks />} />
            <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
    );
}

export default App;
