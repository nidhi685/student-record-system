import React, { useContext } from 'react';
import { AuthContext } from "../../pages/context/AuthContext";

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);

    return (

        <div className='bg-white shadow p-4 flex justify-between'>

            <h1 className='text-xl font-bold'>
                Student Record System
            </h1>

            <div className="flex gap-4 items-center">

                <span>{user?.name}</span>

                <button
                    onClick={logout}
                    className='bg-red-500 text-white px-3 py-1 rounded'
                >
                    Logout
                </button>

            </div>

        </div>
    );
};

export default Navbar;