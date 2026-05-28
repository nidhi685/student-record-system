import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../../components/layout/Layout";

const Settings = () => {

    const [adminData, setAdminData] = useState({
        name: "",
        email: "",
    });

    // Fetch Admin Profile
    const fetchProfile = async () => {

        try {

            const res = await API.get(
                "/admin/profile"
            );

            setAdminData(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // Handle Input Change
    const handleChange = (e) => {

        setAdminData({
            ...adminData,
            [e.target.name]: e.target.value,
        });
    };

    // Update Profile
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.put(
                "/admin/update-profile",
                adminData
            );

            alert(res.data.message);

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="p-6">

                {/* Heading */}
                <h1 className="text-3xl font-bold mb-6">
                    Settings
                </h1>

                {/* Form Card */}
                <div className="bg-white shadow-lg rounded-xl p-6 max-w-lg">

                    <form onSubmit={handleSubmit}>

                        {/* Admin Name */}
                        <div className="mb-4">

                            <label className="block mb-2 font-semibold">
                                Admin Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={adminData.name}
                                onChange={handleChange}
                                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter name"
                            />

                        </div>

                        {/* Email */}
                        <div className="mb-4">

                            <label className="block mb-2 font-semibold">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={adminData.email}
                                onChange={handleChange}
                                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter email"
                            />

                        </div>

                        {/* Save Button */}
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
                        >
                            Save Changes
                        </button>

                    </form>

                </div>

            </div>
        </Layout>

    );
};

export default Settings;