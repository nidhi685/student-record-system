import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import API from "../services/api";

const MyResults = () => {

    const [marks, setMarks] = useState([]);

    const getResults = async () => {

        try {

            const res = await API.get("/student/marks");

            setMarks(res.data.marks || []);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        getResults();

    }, []);

    const percentage =
        marks.length > 0
            ? (
                marks.reduce(
                    (acc, item) => acc + item.marks,
                    0
                ) / marks.length
            ).toFixed(1)
            : 0;

    const status =
        percentage >= 35
            ? "PASS"
            : "FAIL";

    return (

        <Layout>

            <div className="p-6">

                <h1 className="text-3xl font-bold mb-6">
                    My Result
                </h1>

                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl">

                    <div className="grid grid-cols-2 gap-5">

                        <div className="bg-blue-500 text-white p-5 rounded-xl">

                            <h2 className="text-lg">
                                Overall Percentage
                            </h2>

                            <p className="text-4xl font-bold mt-3">
                                {percentage}%
                            </p>

                        </div>

                        <div
                            className={`text-white p-5 rounded-xl
                            
                            ${status === "PASS"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                        >

                            <h2 className="text-lg">
                                Result Status
                            </h2>

                            <p className="text-4xl font-bold mt-3">
                                {status}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>
    );
};

export default MyResults;