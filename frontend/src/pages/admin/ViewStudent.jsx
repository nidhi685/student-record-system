import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../../components/layout/Layout";
import { useParams } from "react-router-dom";

const ViewStudent = () => {

    const { id } = useParams();

    const [student, setStudent] = useState({});

    // GET STUDENT
    const getStudent = async () => {

        try {

            const res = await API.get(
                `/admin/student/${id}`
            );

            setStudent(res.data.student);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        getStudent();

    }, []);

    return (

        <Layout>

            <div className="p-6">

                {/* Heading */}
                <div className="mb-6">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Student Details
                    </h1>

                    <p className="text-gray-500 mt-1">
                        View complete student information
                    </p>

                </div>

                {/* Details Card */}
                <div className="bg-white max-w-4xl rounded-2xl shadow-md p-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Name */}
                        <div>

                            <p className="text-sm text-gray-500 mb-1">
                                Full Name
                            </p>

                            <h2 className="text-lg font-semibold text-gray-800">
                                {student.name}
                            </h2>

                        </div>

                        {/* Enrollment */}
                        <div>

                            <p className="text-sm text-gray-500 mb-1">
                                Enrollment Number
                            </p>

                            <h2 className="text-lg font-semibold text-gray-800">
                                {student.enrollment}
                            </h2>

                        </div>

                        {/* Email */}
                        <div>

                            <p className="text-sm text-gray-500 mb-1">
                                Email Address
                            </p>

                            <h2 className="text-lg font-semibold text-gray-800">
                                {student.email}
                            </h2>

                        </div>

                        {/* Mobile */}
                        <div>

                            <p className="text-sm text-gray-500 mb-1">
                                Mobile Number
                            </p>

                            <h2 className="text-lg font-semibold text-gray-800">
                                {student.mobile}
                            </h2>

                        </div>

                        {/* Course */}
                        <div>

                            <p className="text-sm text-gray-500 mb-1">
                                Course
                            </p>

                            <h2 className="text-lg font-semibold text-gray-800">
                                {student.course}
                            </h2>

                        </div>

                        {/* Semester */}
                        <div>

                            <p className="text-sm text-gray-500 mb-1">
                                Semester
                            </p>

                            <h2 className="text-lg font-semibold text-gray-800">
                                {student.semester}
                            </h2>

                        </div>

                        {/* Address */}
                        <div className="md:col-span-2">

                            <p className="text-sm text-gray-500 mb-1">
                                Address
                            </p>

                            <div className="bg-gray-50 border rounded-lg p-4 text-gray-700">
                                {student.address}
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>
    );
};

export default ViewStudent;