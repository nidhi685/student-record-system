import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import API from "../services/api";

const StudentDashboard = () => {

    const [marks, setMarks] = useState([]);

    // Get Marks
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

    return (

        <Layout>

            <div className="p-6">

                {/* Heading */}

                <div className="mb-6">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Student Dashboard
                    </h1>

                    <p className="text-gray-500 mt-1">
                        View your subject marks and grades
                    </p>

                </div>

                {/* Cards */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                    <div className="bg-blue-500 text-white rounded-xl p-5 shadow-md">
                        <h2 className="text-lg font-semibold">
                            Total Subjects
                        </h2>

                        <p className="text-3xl font-bold mt-2">
                            {marks.length}
                        </p>
                    </div>

                    <div className="bg-green-500 text-white rounded-xl p-5 shadow-md">
                        <h2 className="text-lg font-semibold">
                            Highest Marks
                        </h2>

                        <p className="text-3xl font-bold mt-2">
                            {
                                marks.length > 0
                                    ? Math.max(...marks.map((m) => m.marks))
                                    : 0
                            }
                        </p>
                    </div>

                    <div className="bg-purple-500 text-white rounded-xl p-5 shadow-md">
                        <h2 className="text-lg font-semibold">
                            Average Marks
                        </h2>

                        <p className="text-3xl font-bold mt-2">
                            {
                                marks.length > 0
                                    ? (
                                        marks.reduce(
                                            (acc, item) => acc + item.marks,
                                            0
                                        ) / marks.length
                                    ).toFixed(1)
                                    : 0
                            }
                        </p>
                    </div>

                </div>

                <div className="bg-white rounded-xl shadow-md p-6">

                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Recent Subjects
                    </h2>

                    <div className="space-y-3">

                        {marks.slice(0, 3).map((m) => (

                            <div
                                key={m._id}
                                className="flex justify-between items-center border-b pb-3"
                            >

                                <div>

                                    <p className="font-medium text-gray-800">
                                        {m.subject}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Grade: {m.grade}
                                    </p>

                                </div>

                                <div className="text-lg font-bold text-blue-600">
                                    {m.marks}
                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </Layout>
    );
};

export default StudentDashboard;