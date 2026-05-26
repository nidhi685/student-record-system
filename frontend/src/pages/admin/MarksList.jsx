import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../../components/layout/Layout";

const MarksList = () => {

    const [marks, setMarks] = useState([]);
    const [search, setSearch] = useState("");

    // GET ALL MARKS
    const getMarks = async () => {

        try {

            const res = await API.get("/admin/marks");

            setMarks(res.data.marks);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        getMarks();

    }, []);

    // SEARCH FILTER
    const filtered = marks.filter((m) =>
        m.studentId?.name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    return (

        <Layout>

            <div className="p-6 bg-gray-100">

                {/* Heading */}
                <div className="mb-6">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Student Marks
                    </h1>

                    <p className="text-gray-500 mt-1">
                        View all student marks records
                    </p>

                </div>

                {/* Search */}
                <div className="bg-white p-4 rounded-2xl shadow-sm mb-5">

                    <input
                        type="text"
                        placeholder="Search student..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-100">

                                <tr className="text-gray-700">

                                    <th className="p-4 text-left">
                                        Student
                                    </th>

                                    <th className="p-4 text-left">
                                        Enrollment
                                    </th>

                                    <th className="p-4 text-left">
                                        Course
                                    </th>

                                    <th className="p-4 text-left">
                                        Subject
                                    </th>

                                    <th className="p-4 text-left">
                                        Marks
                                    </th>

                                    <th className="p-4 text-left">
                                        Grade
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filtered.length > 0 ? (

                                    filtered.map((m) => (

                                        <tr
                                            key={m._id}
                                            className="border-t hover:bg-gray-50 transition"
                                        >

                                            <td className="p-4 font-medium text-gray-800">
                                                {m.studentId?.name}
                                            </td>

                                            <td className="p-4 text-gray-600">
                                                {m.studentId?.enrollment}
                                            </td>

                                            <td className="p-4 text-gray-600">
                                                {m.studentId?.course}
                                            </td>

                                            <td className="p-4 text-gray-600">
                                                {m.subject}
                                            </td>

                                            <td className="p-4 text-gray-600">
                                                {m.marks}
                                            </td>

                                            <td className="p-4">
                                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                                    {m.grade}
                                                </span>
                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center p-6 text-gray-500"
                                        >
                                            No marks found
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

export default MarksList;