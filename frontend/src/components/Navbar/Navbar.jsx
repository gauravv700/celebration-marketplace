import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../Logo/logo";
import { useAuth } from "../../context/AuthContext";

const navigationItems = [
    { label: "Home", to: "/" },
    { label: "Explore services", to: "/services" },
    { label: "How it works", to: "/about" },
];

const Navbar = () => {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const profilePath = user?.role === "vendor" ? "/vendor/profile" : "/profile";
    const closeMenu = () => setMenuOpen(false);

    const handleLogout = () => {
        logout();
        closeMenu();
        navigate("/");
    };

    const navLinkClass = ({ isActive }) => `rounded-lg px-3 py-2 text-sm font-medium transition ${
        isActive ? "bg-white/10 text-white" : "text-indigo-100/80 hover:bg-white/10 hover:text-white"
    }`;

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#17142d]/95 text-white shadow-lg shadow-indigo-950/10 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-6">
                <Logo />
                <div className="hidden items-center gap-1 md:flex">
                    {navigationItems.map((item) => (
                        <NavLink key={item.to} to={item.to} end={item.to === "/"} className={navLinkClass}>{item.label}</NavLink>
                    ))}
                </div>
                <div className="hidden items-center gap-3 md:flex">
                    {!loading && (user ? (
                        <><NavLink to={profilePath} className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10">Profile</NavLink><button type="button" onClick={handleLogout} className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600">Logout</button></>
                    ) : (
                        <><NavLink to="/login" className="rounded-lg px-4 py-2 text-sm font-semibold text-indigo-100 transition hover:text-white">Log in</NavLink><NavLink to="/signup" className="rounded-lg bg-gradient-to-r from-amber-400 to-orange-400 px-4 py-2 text-sm font-bold text-[#211935] shadow-lg shadow-orange-500/20 transition hover:from-amber-300 hover:to-orange-300">Get started</NavLink></>
                    ))}
                </div>
                <button type="button" onClick={() => setMenuOpen((isOpen) => !isOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} className="rounded-lg p-2 text-indigo-100 transition hover:bg-white/10 hover:text-white md:hidden">
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            {menuOpen && (
                <div className="border-t border-white/10 bg-[#17142d] px-5 pb-5 pt-3 md:hidden">
                    <div className="flex flex-col gap-1">{navigationItems.map((item) => <NavLink key={item.to} to={item.to} end={item.to === "/"} onClick={closeMenu} className={navLinkClass}>{item.label}</NavLink>)}</div>
                    {!loading && <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">{user ? (
                        <><NavLink to={profilePath} onClick={closeMenu} className="rounded-lg border border-white/20 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white/10">Profile</NavLink><button type="button" onClick={handleLogout} className="rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600">Logout</button></>
                    ) : (
                        <><NavLink to="/login" onClick={closeMenu} className="rounded-lg border border-white/20 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white/10">Log in</NavLink><NavLink to="/signup" onClick={closeMenu} className="rounded-lg bg-gradient-to-r from-amber-400 to-orange-400 px-4 py-2.5 text-center text-sm font-bold text-[#211935]">Get started</NavLink></>
                    )}</div>}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
