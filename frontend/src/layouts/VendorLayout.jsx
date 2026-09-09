import Sidebar from "../components/vendor/Sidebar";
import Navbar from "../components/vendor/Navbar";
import { Outlet } from "react-router-dom";

const VendorLayout = () => {

    return (

        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );

};

export default VendorLayout;