import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";

const MyProfile = () => {

    const [student, setStudent] = useState({});

    // Get Profile
    const getProfile = async () => {

        try {

            const res = await API.get(
                "/student/profile"
            );

            console.log(res.data);

            setStudent(res.data.student);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        getProfile();

    }, []);

    return (

        <Layout>

            <div className="p-6">

                {/* Heading */}

                <div className="flex justify-between items-center mb-6">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            My Profile
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Student personal information
                        </p>

                    </div>

                    <Link
                        to="/edit-profile"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow"
                    >
                        Edit Profile
                    </Link>

                </div>

                {/* Profile Card */}

                <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl border border-gray-100">

                    <div className="flex flex-col md:flex-row items-center gap-8">

                        {/* Avatar */}

                        <div className="flex flex-col items-center">

                            <div className="w-28 h-28 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold shadow-md">

                                {student?.name?.charAt(0)}

                            </div>

                            <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                                {student.name}
                            </h2>

                            <p className="text-gray-500">
                                Student
                            </p>

                        </div>

                        {/* Details */}

                        <div className="flex-1 w-full">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div className="bg-gray-50 p-4 rounded-xl">

                                    <p className="text-sm text-gray-500 mb-1">
                                        Full Name
                                    </p>

                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {student.name}
                                    </h3>

                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl">

                                    <p className="text-sm text-gray-500 mb-1">
                                        Email Address
                                    </p>

                                    <h3 className="text-lg font-semibold text-gray-800 break-words">
                                        {student.email}
                                    </h3>

                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl">

                                    <p className="text-sm text-gray-500 mb-1">
                                        Course
                                    </p>

                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {student.course}
                                    </h3>

                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl">

                                    <p className="text-sm text-gray-500 mb-1">
                                        Enrollment
                                    </p>

                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {student.enrollment || "N/A"}
                                    </h3>

                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl">

                                    <p className="text-sm text-gray-500 mb-1">
                                        Mobile Number
                                    </p>

                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {student.mobile || "N/A"}
                                    </h3>

                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl">

                                    <p className="text-sm text-gray-500 mb-1">
                                        Semester
                                    </p>

                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {student.semester || "N/A"}
                                    </h3>

                                </div>

                            </div>

                            {/* Address */}

                            <div className="bg-gray-50 p-4 rounded-xl mt-5">

                                <p className="text-sm text-gray-500 mb-1">
                                    Address
                                </p>

                                <h3 className="text-lg font-semibold text-gray-800">
                                    {student.address || "N/A"}
                                </h3>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>
    );
};

export default MyProfile;