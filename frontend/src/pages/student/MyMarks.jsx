import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import API from "../services/api";

const MyMarks = () => {

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

    return (

        <Layout>

            <div className="p-6">

                {/* Heading */}
                <div className="mb-6">

                    <h1 className="text-3xl font-bold text-gray-800">
                        My Marks
                    </h1>

                    <p className="text-gray-500 mt-1">
                        View all subject marks and grades
                    </p>

                </div>

                {/* Marks Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                    <table className="w-full">

                        {/* Table Head */}
                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-4 text-left font-semibold text-gray-700">
                                    Subject
                                </th>

                                <th className="p-4 text-left font-semibold text-gray-700">
                                    Marks
                                </th>

                                <th className="p-4 text-left font-semibold text-gray-700">
                                    Grade
                                </th>

                                <th className="p-4 text-left font-semibold text-gray-700">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        {/* Table Body */}
                        <tbody>

                            {marks.length > 0 ? (

                                marks.map((m) => (

                                    <tr
                                        key={m._id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >

                                        {/* Subject */}
                                        <td className="p-4 font-medium text-gray-800">
                                            {m.subject}
                                        </td>

                                        {/* Marks */}
                                        <td className="p-4 text-gray-700">
                                            {m.marks}
                                        </td>

                                        {/* Grade */}
                                        <td className="p-4">

                                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                                {m.grade}
                                            </span>

                                        </td>

                                        {/* Status */}
                                        <td className="p-4">

                                            {m.marks >= 35 ? (

                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                    Pass
                                                </span>

                                            ) : (

                                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                    Fail
                                                </span>

                                            )}

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="text-center p-8 text-gray-500"
                                    >
                                        No Marks Available
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </Layout>
    );
};

export default MyMarks;