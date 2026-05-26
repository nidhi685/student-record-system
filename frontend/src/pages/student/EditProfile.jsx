import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        course: "",
        mobile: "",
        semester: "",
        address: "",
    });

    // GET PROFILE
    const getProfile = async () => {

        try {

            const res = await API.get(
                "/student/profile"
            );

            setForm(res.data.student);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        getProfile();

    }, []);

    // HANDLE INPUT
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // UPDATE PROFILE
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.put(
                "/student/update-profile",
                {
                    name: form.name,
                    mobile: form.mobile,
                    address: form.address,
                }
            );

            alert(
                "Profile Updated Successfully"
            );

            navigate("/profile");

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

            <div className="p-6 bg-gray-100 min-h-screen">

                {/* Heading */}
                <div className="mb-6">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Edit Profile
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Update your personal information
                    </p>

                </div>

                {/* Form Card */}
                <div className="bg-white shadow-md rounded-2xl p-8 max-w-5xl">

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >

                        {/* NAME */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={form.name || ""}
                                onChange={handleChange}
                                placeholder="Enter full name"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                            />

                        </div>

                        {/* EMAIL */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email || ""}
                                disabled
                                className="w-full border border-gray-300 bg-gray-100 text-gray-500 rounded-xl px-4 py-3 cursor-not-allowed"
                            />

                            <p className="text-xs text-gray-400 mt-1">
                                Only admin can change email
                            </p>

                        </div>

                        {/* COURSE */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Course
                            </label>

                            <input
                                type="text"
                                name="course"
                                value={form.course || ""}
                                disabled
                                className="w-full border border-gray-300 bg-gray-100 text-gray-500 rounded-xl px-4 py-3 cursor-not-allowed"
                            />

                            <p className="text-xs text-gray-400 mt-1">
                                Managed by admin
                            </p>

                        </div>

                        {/* MOBILE */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mobile Number
                            </label>

                            <input
                                type="text"
                                name="mobile"
                                value={form.mobile || ""}
                                onChange={handleChange}
                                placeholder="Enter mobile number"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                            />

                        </div>

                        {/* SEMESTER */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Semester
                            </label>

                            <input
                                type="number"
                                name="semester"
                                value={form.semester || ""}
                                disabled
                                className="w-full border border-gray-300 bg-gray-100 text-gray-500 rounded-xl px-4 py-3 cursor-not-allowed"
                            />

                            <p className="text-xs text-gray-400 mt-1">
                                Only admin can update semester
                            </p>

                        </div>

                        {/* ADDRESS */}
                        <div className="md:col-span-2">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address
                            </label>

                            <textarea
                                name="address"
                                rows="4"
                                value={form.address || ""}
                                onChange={handleChange}
                                placeholder="Enter address"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                            />

                        </div>

                        {/* BUTTONS */}
                        <div className="md:col-span-2 flex gap-4 mt-2">

                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition"
                            >
                                Update Profile
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/profile")}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-xl font-medium transition"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </Layout>
    );
};

export default EditProfile;