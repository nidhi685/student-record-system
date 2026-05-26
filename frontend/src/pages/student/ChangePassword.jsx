import { useState } from "react";
import Layout from "../../components/layout/Layout";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // HANDLE CHANGE
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // HANDLE SUBMIT
    const handleSubmit = async (e) => {

        e.preventDefault();

        // PASSWORD MATCH CHECK

        if (
            form.newPassword !==
            form.confirmPassword
        ) {

            return alert(
                "New password and confirm password do not match"
            );
        }

        try {

            await API.put(
                "/student/change-password",
                {
                    oldPassword: form.oldPassword,
                    newPassword: form.newPassword,
                }
            );

            alert(
                "Password Changed Successfully"
            );

            navigate("/profile");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to change password"
            );
        }
    };

    return (

        <Layout>

            <div className="p-6 bg-gray-100 min-h-screen">

                {/* Heading */}
                <div className="mb-6">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Change Password
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Update your account password
                    </p>

                </div>

                {/* Form */}
                <div className="bg-white max-w-2xl rounded-2xl shadow-md p-8">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Old Password */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Password
                            </label>

                            <input
                                type="password"
                                name="oldPassword"
                                value={form.oldPassword}
                                onChange={handleChange}
                                placeholder="Enter current password"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                            />

                        </div>

                        {/* New Password */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>

                            <input
                                type="password"
                                name="newPassword"
                                value={form.newPassword}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                            />

                        </div>

                        {/* Confirm Password */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm new password"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                            />

                        </div>

                        {/* Button */}
                        <div className="pt-2">

                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition"
                            >
                                Update Password
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </Layout>
    );
};

export default ChangePassword;