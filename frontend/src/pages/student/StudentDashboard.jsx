import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import API from "../services/api";

const StudentDashboard = () => {

    const [marks, setMarks] = useState([]);

    // GET MARKS
    const getMarks = async () => {

        try {

            const res = await API.get("/student/marks");

            setMarks(res.data.marks || []);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        getMarks();

    }, []);

    // TOTAL %
    const overallPercentage =
        marks.length > 0
            ? (
                marks.reduce(
                    (acc, item) => acc + item.marks,
                    0
                ) / marks.length
            ).toFixed(1)
            : 0;

    // PASS / FAIL
    const resultStatus =
        overallPercentage >= 35
            ? "PASS"
            : "FAIL";

    return (

        <Layout>

            <div className="p-6">

                {/* Heading */}
                <div className="mb-6">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Student Dashboard
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Welcome back 👋
                    </p>

                </div>

                {/* CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

                    {/* Total Subjects */}
                    <div className="bg-blue-500 text-white rounded-2xl p-5 shadow-lg">

                        <h2 className="text-lg font-semibold">
                            Total Subjects
                        </h2>

                        <p className="text-4xl font-bold mt-3">
                            {marks.length}
                        </p>

                    </div>

                    {/* Overall Percentage */}
                    <div className="bg-green-500 text-white rounded-2xl p-5 shadow-lg">

                        <h2 className="text-lg font-semibold">
                            Overall %
                        </h2>

                        <p className="text-4xl font-bold mt-3">
                            {overallPercentage}%
                        </p>

                    </div>

                    {/* Highest Marks */}
                    <div className="bg-purple-500 text-white rounded-2xl p-5 shadow-lg">

                        <h2 className="text-lg font-semibold">
                            Highest Marks
                        </h2>

                        <p className="text-4xl font-bold mt-3">
                            {
                                marks.length > 0
                                    ? Math.max(
                                        ...marks.map((m) => m.marks)
                                    )
                                    : 0
                            }
                        </p>

                    </div>

                    {/* Result Status */}
                    <div
                        className={`rounded-2xl p-5 shadow-lg text-white
                        
                        ${resultStatus === "PASS"
                                ? "bg-emerald-500"
                                : "bg-red-500"
                            }`}
                    >

                        <h2 className="text-lg font-semibold">
                            Result Status
                        </h2>

                        <p className="text-4xl font-bold mt-3">
                            {resultStatus}
                        </p>

                    </div>

                </div>

                {/* Semester Result */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

                    <div className="flex justify-between items-center mb-5">

                        <h2 className="text-2xl font-bold text-gray-800">
                            Semester Result
                        </h2>

                        <select className="border px-4 py-2 rounded-lg outline-none">

                            <option>
                                Semester 1
                            </option>

                            <option>
                                Semester 2
                            </option>

                            <option>
                                Semester 3
                            </option>

                            <option>
                                Semester 4
                            </option>

                        </select>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-100">

                                <tr>

                                    <th className="p-4 text-left">
                                        Subject
                                    </th>

                                    <th className="p-4 text-left">
                                        Marks
                                    </th>

                                    <th className="p-4 text-left">
                                        Grade
                                    </th>

                                    <th className="p-4 text-left">
                                        Status
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {marks.map((m) => (

                                    <tr
                                        key={m._id}
                                        className="border-b hover:bg-gray-50"
                                    >

                                        <td className="p-4 font-medium">
                                            {m.subject}
                                        </td>

                                        <td className="p-4">
                                            {m.marks}
                                        </td>

                                        <td className="p-4">

                                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                {m.grade}
                                            </span>

                                        </td>

                                        <td className="p-4">

                                            {m.marks >= 35 ? (

                                                <span className="text-green-600 font-semibold">
                                                    Pass
                                                </span>

                                            ) : (

                                                <span className="text-red-600 font-semibold">
                                                    Fail
                                                </span>

                                            )}

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

export default StudentDashboard;