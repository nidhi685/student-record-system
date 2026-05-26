import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";

const EditStudent = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        enrollment: "",
        email: "",
        mobile: "",
        course: "",
        semester: "",
        address: "",
    });

    // GET SINGLE STUDENT
    const getStudent = async () => {

        try {

            const res = await API.get(`/admin/student/${id}`);

            setForm({
                name: res.data.student.name || "",
                enrollment: res.data.student.enrollment || "",
                email: res.data.student.email || "",
                mobile: res.data.student.mobile || "",
                course: res.data.student.course || "",
                semester: res.data.student.semester || "",
                address: res.data.student.address || "",
            });

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        getStudent();

    }, []);

    // HANDLE CHANGE
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // UPDATE STUDENT
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.put(
                `/admin/update-student/${id}`,
                form
            );

            alert("Student Updated Successfully");

            navigate("/students");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Update Failed"
            );
        }
    };

    return (

        <Layout>

            <div className="p-6 bg-gray-100">

                {/* Heading */}
                <div className="mb-6">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Edit Student
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Update student information below
                    </p>

                </div>

                {/* Form Card */}
                <div className="bg-white max-w-4xl rounded-2xl shadow-md p-8">

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >

                        {/* Name */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                placeholder="Enter Name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                                onChange={handleChange}
                            />

                        </div>

                        {/* Enrollment */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Enrollment Number
                            </label>

                            <input
                                type="text"
                                name="enrollment"
                                value={form.enrollment}
                                placeholder="Enter Enrollment Number"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                                onChange={handleChange}
                            />

                        </div>

                        {/* Email */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                placeholder="Enter Email"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                                onChange={handleChange}
                            />

                        </div>

                        {/* Mobile */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mobile Number
                            </label>

                            <input
                                type="text"
                                name="mobile"
                                value={form.mobile}
                                placeholder="Enter Mobile Number"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                                onChange={handleChange}
                            />

                        </div>

                        {/* Course */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Course
                            </label>

                            <input
                                type="text"
                                name="course"
                                value={form.course}
                                placeholder="Enter Course"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                                onChange={handleChange}
                            />

                        </div>

                        {/* Semester */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Semester
                            </label>

                            <input
                                type="number"
                                name="semester"
                                value={form.semester}
                                placeholder="Enter Semester"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                                onChange={handleChange}
                            />

                        </div>

                        {/* Address */}
                        <div className="md:col-span-2">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address
                            </label>

                            <textarea
                                name="address"
                                rows="4"
                                value={form.address}
                                placeholder="Enter Address"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                                onChange={handleChange}
                            />

                        </div>

                        {/* Button */}
                        <div className="md:col-span-2 flex justify-end">

                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition"
                            >
                                Update Student
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </Layout>
    );
};

export default EditStudent;