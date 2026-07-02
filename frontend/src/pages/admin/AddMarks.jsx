import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";

const AddMarks = () => {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [form, setForm] = useState({
        studentId: "",
        subject: "",
        marks: "",
        grade: "",
    });

    // GET STUDENTS
    const getStudents = async () => {

        try {

            const res = await API.get(
                "/admin/students"
            );

            setStudents(
                res.data.students
            );

        } catch (error) {

            console.log(error);
        }
    };

    const getSubjects = async () => {
        try {
            const res = await API.get("/admin/subjects");
            setSubjects(res.data.subjects);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getStudents();
        getSubjects();
    }, []);

    // HANDLE CHANGE
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
            }

            setForm({
                ...form,
                studentId: value,
                subject: "",
            });

        } else {

            setForm({
                ...form,
                [name]: value,
            });

        }

    };

    // HANDLE SUBMIT
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                "/admin/add-marks",
                form
            );

            alert(
                "Marks Added Successfully"
            );

            setForm({
                studentId: "",
                subject: "",
                marks: "",
                grade: "",
            });
            setFilteredSubjects([]);
            // REDIRECT TO MARKS LIST
            navigate("/marks");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message
            );
        }
    };

    return (

        <Layout>

            <div className="p-6">

                {/* Heading */}
                <div className="mb-6">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Add Marks
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Enter student marks details below
                    </p>

                </div>

                {/* Form Card */}
                <div className="bg-white max-w-4xl rounded-2xl shadow-md p-6">

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >

                        {/* Student */}
                        <div className="md:col-span-2">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Student
                            </label>

                            <select
                                name="studentId"
                                value={form.studentId}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                            >

                                <option value="">
                                    Select Student
                                </option>

                                {students.map((s) => (

                                    <option
                                        key={s._id}
                                        value={s._id}
                                    >
                                        {s.name} ({s.course} - Sem {s.semester})
                                    </option>

                                ))}

                            </select>

                        </div>

                        {/* Subject */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subject
                            </label>

                            <select
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
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
                                        No Subject Available
                                    </option>

                                )}
                            </select>
                        </div>

                        {/* Marks */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Marks
                            </label>

                            <input
                                type="number"
                                name="marks"
                                placeholder="Enter marks"
                                value={form.marks}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                            />

                        </div>

                        {/* Grade */}
                        <div className="md:col-span-2">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Grade
                            </label>

                            <input
                                type="text"
                                name="grade"
                                placeholder="Enter grade"
                                value={form.grade}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                            />

                        </div>

                        {/* Button */}
                        <div className="md:col-span-2 flex justify-end mt-2">

                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition"
                            >
                                Add Marks
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </Layout>
    );
};

export default AddMarks;