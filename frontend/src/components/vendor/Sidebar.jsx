import {
    LayoutDashboard,
    Package,
    CalendarDays,
    User,
    LogOut
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {

    const { logout } = useAuth();

    return (

        <aside className="w-64 bg-indigo-700 text-white">

            <div className="p-6 text-2xl font-bold">

                Vendor Panel

            </div>

            <nav className="space-y-2 p-4">

                <NavLink
                    to="/vendor/dashboard"
                    end
                    className="flex items-center gap-3 rounded p-3 hover:bg-indigo-600"
                >
                    <LayoutDashboard />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/vendor/services"
                    className="flex items-center gap-3 rounded p-3 hover:bg-indigo-600"
                >
                    <Package />
                    My Services
                </NavLink>

                <NavLink
                    to="/vendor/bookings"
                    className="flex items-center gap-3 rounded p-3 hover:bg-indigo-600"
                >
                    <CalendarDays />
                    Bookings
                </NavLink>

                <NavLink
                    to="/vendor/profile"
                    className="flex items-center gap-3 rounded p-3 hover:bg-indigo-600"
                >
                    <User />
                    Profile
                </NavLink>

                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded p-3 hover:bg-red-500"
                >
                    <LogOut />
                    Logout
                </button>

            </nav>

        </aside>

    );

};

export default Sidebar;