import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";

const StudentList = () => {

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    const getStudents = async () => {

        try {

            const res = await API.get("/admin/students");

            setStudents(res.data.students);

        } catch (error) {

            console.log(error);
        }
    };

    const deleteStudent = async (id) => {

        try {

            await API.delete(`/admin/delete-student/${id}`);

            getStudents();

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        getStudents();

    }, []);

    const filtered = students.filter((s) =>
        s.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (

        <Layout>

            <div className="p-6 bg-gray-100 h-full">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Students
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage all student records
                        </p>

                    </div>

                    <Link
                        to="/add-student"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition w-fit"
                    >
                        + Add Student
                    </Link>

                </div>

                {/* Search */}
                <div className="bg-white p-4 rounded-2xl shadow-sm mb-5">

                    <input
                        type="text"
                        placeholder="Search student by name..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                {/* Table Card */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-100">
                                <tr className="text-gray-700">

                                    <th className="p-4 text-left">
                                        Name
                                    </th>

                                    <th className="p-4 text-left">
                                        Enrollment
                                    </th>

                                    <th className="p-4 text-left">
                                        Email
                                    </th>

                                    <th className="p-4 text-left">
                                        Mobile
                                    </th>

                                    <th className="p-4 text-left">
                                        Course
                                    </th>

                                    <th className="p-4 text-left">
                                        Semester
                                    </th>

                                    <th className="p-4 text-center">
                                        Actions
                                    </th>

                                </tr>
                            </thead>
                            <tbody>

                                {filtered.map((s) => (

                                    <tr
                                        key={s._id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >

                                        <td className="p-4 font-medium">
                                            {s.name}
                                        </td>

                                        <td className="p-4">
                                            {s.enrollment}
                                        </td>

                                        <td className="p-4">
                                            {s.email}
                                        </td>

                                        <td className="p-4">
                                            {s.mobile}
                                        </td>

                                        <td className="p-4">
                                            {s.course}
                                        </td>

                                        <td className="p-4">
                                            Semester {s.semester}
                                        </td>

                                        <td className="p-4">

                                            <div className="flex gap-2 justify-center">

                                                <Link
                                                    to={`/view-student/${s._id}`}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
                                                >
                                                    View
                                                </Link>

                                                <Link
                                                    to={`/edit-student/${s._id}`}
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    onClick={() => deleteStudent(s._id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </Layout>
    );
};

export default StudentList;