import { useEffect, useState } from "react";
import axios from "axios";
import API from "../services/api";
import Layout from "../../components/layout/Layout";

const Results = () => {

    const [stats, setStats] = useState({
        passStudents: 0,
        failStudents: 0,
        topper: "",
        topperPercentage: 0,
    });

    // Fetch Result Analytics
    const fetchResults = async () => {

        try {

            const res = await API.get(
                "/admin/results-analytics"
            );

            setStats(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchResults();
    }, []);

    return (
        <Layout>
            <div className="p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Results Analytics
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    {/* Pass Students */}
                    <div className="bg-green-500 text-white p-5 rounded-xl shadow-lg">

                        <h2 className="text-xl">
                            Pass Students
                        </h2>

                        <p className="text-4xl font-bold mt-2">
                            {stats.passStudents}
                        </p>

                    </div>

                    {/* Fail Students */}
                    <div className="bg-red-500 text-white p-5 rounded-xl shadow-lg">

                        <h2 className="text-xl">
                            Fail Students
                        </h2>

                        <p className="text-4xl font-bold mt-2">
                            {stats.failStudents}
                        </p>

                    </div>

                    {/* Topper */}
                    <div className="bg-blue-500 text-white p-5 rounded-xl shadow-lg">

                        <h2 className="text-xl">
                            Topper
                        </h2>

                        <p className="text-2xl font-bold mt-2">
                            {stats.topper}
                        </p>

                        <p className="mt-2 text-lg">
                            {stats.topperPercentage}%
                        </p>

                    </div>

                </div>

            </div>
        </Layout>
    );
};

export default Results;