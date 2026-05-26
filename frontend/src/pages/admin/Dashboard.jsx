import React, { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../../components/layout/Layout";

import {
    FaUserGraduate,
    FaChartBar,
    FaBook,
    FaClipboardList,
} from "react-icons/fa";

const Dashboard = () => {

    const [dashboard, setDashboard] = useState({

        totalStudents: 0,

        totalMarks: 0,

        averageMarks: 0,

        totalCourses: 0,

        recentStudents: [],
    });

    // GET DASHBOARD DATA

    const getDashboard = async () => {

        try {

            const res = await API.get(
                "/admin/dashboard"
            );

            setDashboard({

                totalStudents:
                    res.data.totalStudents || 0,

                totalMarks:
                    res.data.totalMarks || 0,

                averageMarks:
                    res.data.averageMarks || 0,

                totalCourses:
                    res.data.totalCourses || 0,

                recentStudents:
                    res.data.recentStudents || [],
            });

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        getDashboard();

    }, []);

    return (

        <Layout>

            <div className="p-6 bg-gray-100 min-h-screen">

                {/* Heading */}

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-gray-800">
                        Admin Dashboard
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Welcome back 👋 Manage students and records easily.
                    </p>

                </div>

                {/* Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Total Students */}

                    <div className="bg-blue-600 text-white rounded-2xl shadow-md p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-lg font-medium">
                                    Total Students
                                </h2>

                                <p className="text-4xl font-bold mt-3">
                                    {dashboard.totalStudents}
                                </p>

                            </div>

                            <FaUserGraduate
                                size={45}
                                className="opacity-80"
                            />

                        </div>

                    </div>

                    {/* Marks Records */}

                    <div className="bg-green-600 text-white rounded-2xl shadow-md p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-lg font-medium">
                                    Marks Records
                                </h2>

                                <p className="text-4xl font-bold mt-3">
                                    {dashboard.totalMarks}
                                </p>

                            </div>

                            <FaClipboardList
                                size={45}
                                className="opacity-80"
                            />

                        </div>

                    </div>

                    {/* Average Marks */}

                    <div className="bg-purple-600 text-white rounded-2xl shadow-md p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-lg font-medium">
                                    Average Marks
                                </h2>

                                <p className="text-4xl font-bold mt-3">
                                    {dashboard.averageMarks}
                                </p>

                            </div>

                            <FaChartBar
                                size={45}
                                className="opacity-80"
                            />

                        </div>

                    </div>

                    {/* Courses */}

                    <div className="bg-orange-500 text-white rounded-2xl shadow-md p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-lg font-medium">
                                    Courses
                                </h2>

                                <p className="text-4xl font-bold mt-3">
                                    {dashboard.totalCourses}
                                </p>

                            </div>

                            <FaBook
                                size={45}
                                className="opacity-80"
                            />

                        </div>

                    </div>

                </div>

                {/* Recent Students */}

                <div className="mt-10 bg-white rounded-2xl shadow-md p-6">

                    <h2 className="text-2xl font-bold text-gray-700 mb-5">
                        Recent Students
                    </h2>

                    {
                        dashboard.recentStudents?.length > 0 ? (

                            <div className="space-y-4">

                                {
                                    dashboard.recentStudents?.map((s) => (

                                        <div
                                            key={s._id}
                                            className="flex justify-between items-center border-b pb-3"
                                        >

                                            <div>

                                                <p className="font-medium text-gray-800">
                                                    {s.name}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    {s.course}
                                                </p>

                                            </div>

                                            <p className="text-sm text-gray-400">
                                                {
                                                    new Date(
                                                        s.createdAt
                                                    ).toLocaleDateString()
                                                }
                                            </p>

                                        </div>
                                    ))
                                }

                            </div>

                        ) : (

                            <p className="text-gray-500">
                                No recent students found
                            </p>

                        )
                    }

                </div>

            </div>

        </Layout>
    );
};

export default Dashboard;