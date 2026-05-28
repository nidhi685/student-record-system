import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import API from "../services/api";

const MyAttendance = () => {

    const [attendance, setAttendance] = useState([]);

    const getAttendance = async () => {

        try {

            const res = await API.get(
                "/student/my-attendance"
            );

            setAttendance(
                res.data.attendance || []
            );

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        getAttendance();

    }, []);

    return (

        <Layout>

            <div className="p-6">

                <h1 className="text-3xl font-bold mb-6">
                    My Attendance
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {attendance.map((a) => (

                        <div
                            key={a._id}
                            className="bg-white rounded-2xl shadow-lg p-5"
                        >

                            <div className="flex justify-between mb-3">

                                <h2 className="text-xl font-semibold">
                                    {a.subject}
                                </h2>

                                <span className="font-bold text-blue-600">
                                    {a.percentage}%
                                </span>

                            </div>

                            {/* Progress */}
                            <div className="w-full bg-gray-200 rounded-full h-3">

                                <div
                                    className={`h-3 rounded-full
                                    
                                    ${a.percentage >= 75
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                        }`}
                                    style={{
                                        width: `${a.percentage}%`,
                                    }}
                                ></div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </Layout>
    );
};

export default MyAttendance;