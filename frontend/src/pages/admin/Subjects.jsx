import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout";

const Subjects = () => {

    const [subjectData, setSubjectData] = useState({
        subjectName: "",
        subjectCode: "",
        course: "",
        semester: "",
    });

    const [subjects, setSubjects] = useState([]);

    // Input Change
    const handleChange = (e) => {
        setSubjectData({
            ...subjectData,
            [e.target.name]: e.target.value,
        });
    };

    // Get All Subjects
    const getSubjects = async () => {
        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(
                "http://localhost:5000/api/admin/subjects",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.success) {
                setSubjects(res.data.subjects);
            }

        } catch (error) {
            console.log(error);
        }
    };

    // Add Subject
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !subjectData.subjectName ||
            !subjectData.subjectCode ||
            !subjectData.course ||
            !subjectData.semester
        ) {
            alert("Please fill all fields");
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:5000/api/admin/add-subject",
                subjectData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(res.data.message);

            setSubjectData({
                subjectName: "",
                subjectCode: "",
                course: "",
                semester: "",
            });

            getSubjects();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

            console.log(error);
        }
    };

    useEffect(() => {
        getSubjects();
    }, []);

    return (
        <Layout>
            <div className="p-6">

                {/* Heading */}
                <h1 className="text-3xl font-bold mb-6">
                    Subjects Management
                </h1>

                {/* Form */}
                <div className="bg-white shadow-lg rounded-xl p-6 mb-8 max-w-xl">

                    <form onSubmit={handleSubmit}>

                        {/* Subject Name */}
                        <div className="mb-4">

                            <label className="block mb-2 font-semibold">
                                Subject Name
                            </label>

                            <input
                                type="text"
                                name="subjectName"
                                value={subjectData.subjectName}
                                onChange={handleChange}
                                placeholder="Enter Subject Name"
                                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                        {/* Subject Code */}
                        <div className="mb-4">

                            <label className="block mb-2 font-semibold">
                                Subject Code
                            </label>

                            <input
                                type="text"
                                name="subjectCode"
                                value={subjectData.subjectCode}
                                onChange={handleChange}
                                placeholder="Enter Subject Code"
                                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>
                        <div className="mb-4">

                            <label className="block mb-2 font-semibold">
                                Course
                            </label>

                            <select
                                name="course"
                                value={subjectData.course}
                                onChange={handleChange}
                                className="w-full border p-3 rounded-lg"
                            >
                                <option value="">
                                    Select Course
                                </option>

                                <option value="MCA">
                                    MCA
                                </option>

                                <option value="BCA">
                                    BCA
                                </option>

                                <option value="BSc IT">
                                    BSc IT
                                </option>

                                <option value="BTech">
                                    BTech
                                </option>

                            </select>

                        </div>
                        <div className="mb-4">

                            <label className="block mb-2 font-semibold">
                                Semester
                            </label>

                            <select
                                name="semester"
                                value={subjectData.semester}
                                onChange={handleChange}
                                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">
                                    Select Semester
                                </option>

                                {[1, 2, 3, 4, 5, 6].map((sem) => (
                                    <option
                                        key={sem}
                                        value={sem}
                                    >
                                        Semester {sem}
                                    </option>
                                ))}

                            </select>

                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
                        >
                            Add Subject
                        </button>

                    </form>

                </div>

                {/* Subjects Table */}
                <div className="bg-white shadow-lg rounded-xl p-6">

                    <h2 className="text-2xl font-semibold mb-4">
                        Subject List
                    </h2>

                    <div className="overflow-x-auto">

                        <table className="w-full border-collapse">

                            <thead>

                                <tr className="bg-gray-100">

                                    <th className="p-3 text-left border">
                                        Subject Name
                                    </th>

                                    <th className="p-3 text-left border">
                                        Subject Code
                                    </th>
                                    <th className="p-3 text-left border">
                                        Course
                                    </th>
                                    <th className="p-3 text-left border">
                                        Semester
                                    </th>
                                </tr>

                            </thead>

                            <tbody>

                                {subjects.length > 0 ? (

                                    subjects.map((subject) => (

                                        <tr
                                            key={subject._id}
                                            className="border-b"
                                        >

                                            <td className="p-3 border">
                                                {subject.subjectName}
                                            </td>

                                            <td className="p-3 border">
                                                {subject.subjectCode}
                                            </td>
                                            <td className="p-3 border">
                                                {subject.course}
                                            </td>
                                            <td className="p-3 border">
                                                Sem {subject.semester}
                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="p-4 text-center text-gray-500"
                                        >
                                            No Subjects Found
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </Layout>
    );
};

export default Subjects;