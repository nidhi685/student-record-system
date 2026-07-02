import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);

    const [attendanceData, setAttendanceData] = useState({
        studentId: "",
        subject: "",
        percentage: "",
    });

    // Fetch Students
    const fetchStudents = async () => {

        try {

            const res = await API.get("/admin/students");

            setStudents(res.data.students);

        } catch (error) {

            console.log(error);

        }
    };

    // Fetch Subjects
    const getSubjects = async () => {

        try {

            const res = await API.get("/admin/subjects");

            setSubjects(res.data.subjects);

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {

        fetchStudents();
        getSubjects();

    }, []);

    // Handle Change
    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "studentId") {

            const selectedStudent = students.find(
                (student) => student._id === value
            );

            if (selectedStudent) {

                const semSubjects = subjects.filter(
                    (subject) =>
                        subject.course === selectedStudent.course &&
                        Number(subject.semester) === Number(selectedStudent.semester)
                );
                setFilteredSubjects(semSubjects);

                setAttendanceData({
                    studentId: value,
                    subject: "",
                    percentage: attendanceData.percentage,
                });

                return;
            }
        }

        setAttendanceData({
            ...attendanceData,
            [name]: value,
        });
    };

    // Submit Attendance
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post(
                "/admin/add-attendance",
                attendanceData
            );

            alert(res.data.message);

            // Reset Form
            setAttendanceData({
                studentId: "",
                subject: "",
                percentage: "",
            });

            setFilteredSubjects([]);
            navigate('/attendance-list')
        } catch (error) {

            console.log(error);

        }
    };

    return (

        <Layout>

            <div className="p-6">

                {/* Page Header */}
                <div className="mb-6">

                    <h1 className="text-4xl font-bold text-gray-800">
                        Add Attendance
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage student attendance records easily
                    </p>

                </div>

                {/* Main Card */}
                <div className="bg-white max-w-4xl rounded-2xl shadow-lg p-8">

                    <form onSubmit={handleSubmit}>

                        {/* Student */}
                        <div className="mb-6">

                            <label className="block text-gray-700 font-semibold mb-2">
                                Select Student
                            </label>

                            <select
                                name="studentId"
                                value={attendanceData.studentId}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            >

                                <option value="">
                                    Select Student
                                </option>

                                {students.map((student) => (

                                    <option
                                        key={student._id}
                                        value={student._id}
                                    >
                                        {student.name} ({student.course} - Sem {student.semester})                        
                                    </option>

                                ))}

                            </select>

                        </div>

                        {/* Subject & Percentage */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                            {/* Subject */}
                            <div>

                                <label className="block text-gray-700 font-semibold mb-2">
                                    Subject
                                </label>

                                <select
                                    name="subject"
                                    value={attendanceData.subject}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                >

                                    <option value="">
                                        Select Subject
                                    </option>

                                    {filteredSubjects.length > 0 ? (

                                        filteredSubjects.map((subject) => (

                                            <option
                                                key={subject._id}
                                                value={subject.subjectName}
                                            >
                                                {subject.subjectName} ({subject.subjectCode})
                                            </option>

                                        ))

                                    ) : (

                                        <option disabled>
                                            No Subjects Available
                                        </option>

                                    )}

                                </select>

                            </div>

                            {/* Percentage */}
                            <div>

                                <label className="block text-gray-700 font-semibold mb-2">
                                    Attendance %
                                </label>

                                <input
                                    type="number"
                                    name="percentage"
                                    value={attendanceData.percentage}
                                    onChange={handleChange}
                                    placeholder="Enter Attendance Percentage"
                                    className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                            </div>

                        </div>

                        {/* Attendance Status */}
                        {attendanceData.percentage && (

                            <div className="mb-6">

                                <div
                                    className={`inline-block px-4 py-2 rounded-full text-white font-medium
                                    ${attendanceData.percentage >= 75
                                            ? "bg-green-500"
                                            : attendanceData.percentage >= 50
                                                ? "bg-yellow-500"
                                                : "bg-red-500"
                                        }`}
                                >

                                    {attendanceData.percentage >= 75
                                        ? "Excellent Attendance"
                                        : attendanceData.percentage >= 50
                                            ? "Average Attendance"
                                            : "Low Attendance"}

                                </div>

                            </div>

                        )}

                        {/* Button */}
                        <div className="flex justify-end">

                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-semibold transition duration-300 shadow-md"
                            >
                                Add Attendance
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </Layout>
    );
};

export default Attendance;