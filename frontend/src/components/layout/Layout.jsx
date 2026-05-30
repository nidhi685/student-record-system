import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {

    return (

        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Navbar */}
                <Navbar />

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto bg-gray-100">

                    {children}

                </div>

            </div>

        </div>
    );
};

export default Layout;