import React, { useContext } from "react";
import { AuthContext } from "../../pages/context/AuthContext";
import { LogOut } from "lucide-react";

const Navbar = () => {

    const { user, logout } =
        useContext(AuthContext);

    return (

        <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center border-b">

            {/* Left Section */}
            <div>

                <h1 className="text-2xl font-bold text-gray-800">
                    Student Record System
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Welcome back 👋
                </p>

            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">

                {/* User Info */}
                <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl shadow-sm">

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">

                        {user?.name?.charAt(0)}

                    </div>

                    {/* Name & Role */}
                    <div className="hidden sm:block">

                        <h3 className="font-semibold text-gray-800 text-sm">
                            {user?.name}
                        </h3>

                        <p className="text-xs text-gray-500 capitalize">
                            {user?.role}
                        </p>

                    </div>

                </div>

                {/* Logout Button */}
                <button
                    onClick={logout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition shadow-md"
                >

                    <LogOut size={18} />

                    <span className="hidden md:block">
                        Logout
                    </span>

                </button>

            </div>

        </div>
    );
};

export default Navbar;