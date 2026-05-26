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

            <div className="p-6 bg-gray-100">

                {/* Heading */}
                <div className="mb-6">

                    <h1 className="text-3xl font-bold text-gray-800">
                        My Marks
                    </h1>

                    <p className="text-gray-500 mt-1">
                        View all subject marks and grades
                    </p>

                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">

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

                            {marks.length > 0 ? (

                                marks.map((m) => (

                                    <tr
                                        key={m._id}
                                        className="border-t hover:bg-gray-50"
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

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="text-center p-6 text-gray-500"
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