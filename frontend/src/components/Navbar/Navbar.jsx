import { NavLink } from "react-router-dom";
import Logo from "../Logo/logo";

const Navbar = () => {
    return (
        <nav className="border-b bg-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Logo />
                <div className="flex items-center gap-8">
                    <NavLink to="/">
                        Home
                    </NavLink>

                    <NavLink to="/services">
                        Services
                    </NavLink>

                    <NavLink to="/about">
                        About
                    </NavLink>
                </div>

                <div className="flex gap-3">
                    <NavLink
                        to="/login"
                        className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                    >
                        Login
                    </NavLink>

                    <NavLink
                        to="/signup"
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                    >
                        Signup
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;