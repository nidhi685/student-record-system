import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../../components/layout/Layout";

const Reports = () => {

    const [reports, setReports] = useState([]);

    // Fetch Reports
    const fetchReports = async () => {

        try {

            const res = await API.get(
                "/admin/reports"
            );

            setReports(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    return (
        <Layout>
            <div className="p-6">

                {/* Heading */}
                <h1 className="text-3xl font-bold mb-5">
                    Reports
                </h1>

                {/* Table */}
                <div className="bg-white shadow-lg p-5 rounded-xl overflow-x-auto">

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="border-b bg-gray-100">

                                <th className="p-3 text-left">
                                    Student
                                </th>

                                <th className="p-3 text-left">
                                    Course
                                </th>

                                <th className="p-3 text-left">
                                    Percentage
                                </th>

                                <th className="p-3 text-left">
                                    Grade
                                </th>

                                <th className="p-3 text-left">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {reports.length > 0 ? (

                                reports.map((report, index) => (

                                    <tr
                                        key={index}
                                        className="border-b hover:bg-gray-50"
                                    >

                                        <td className="p-3">
                                            {report.studentName}
                                        </td>

                                        <td className="p-3">
                                            {report.course}
                                        </td>

                                        <td className="p-3">
                                            {report.percentage}%
                                        </td>

                                        <td className="p-3">

                                            <span
                                                className={`px-3 py-1 rounded-full text-white text-sm
                      ${report.grade === "A"
                                                        ? "bg-green-500"
                                                        : report.grade === "B"
                                                            ? "bg-blue-500"
                                                            : report.grade === "C"
                                                                ? "bg-yellow-500"
                                                                : "bg-red-500"
                                                    }`}
                                            >
                                                {report.grade}
                                            </span>

                                        </td>

                                        <td className="p-3">

                                            <button
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                                            >
                                                Download PDF
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center p-5 text-gray-500"
                                    >
                                        No Reports Found
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

export default Reports;