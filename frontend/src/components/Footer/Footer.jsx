import { Link } from "react-router-dom";
import { PartyPopper } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#17142d] text-indigo-100">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
                <div>
                    <Link to="/" className="inline-flex items-center gap-2.5 text-white">
                        <PartyPopper size={27} className="text-amber-300" />
                        <span className="text-lg font-bold">Celebration <span className="text-amber-300">Marketplace</span></span>
                    </Link>
                    <p className="mt-5 max-w-sm leading-7 text-indigo-100/70">Your starting place for discovering the people and services behind memorable celebrations.</p>
                </div>
                <div>
                    <h2 className="font-bold text-white">Explore</h2>
                    <div className="mt-4 space-y-3 text-sm text-indigo-100/70"><Link to="/services" className="block hover:text-amber-200">All services</Link><Link to="/services?category=Wedding" className="block hover:text-amber-200">Wedding planning</Link><Link to="/services?category=Birthday" className="block hover:text-amber-200">Birthday events</Link></div>
                </div>
                <div>
                    <h2 className="font-bold text-white">Marketplace</h2>
                    <div className="mt-4 space-y-3 text-sm text-indigo-100/70"><Link to="/about" className="block hover:text-amber-200">About us</Link><Link to="/signup" className="block hover:text-amber-200">Join as a vendor</Link><Link to="/login" className="block hover:text-amber-200">My account</Link></div>
                </div>
                <div>
                    <h2 className="font-bold text-white">Getting started</h2>
                    <p className="mt-4 text-sm leading-6 text-indigo-100/70">Browse services by occasion and budget, then create an account when you are ready to book.</p>
                    <Link to="/services" className="mt-4 inline-flex text-sm font-semibold text-amber-300 hover:text-amber-200">Find a service →</Link>
                </div>
            </div>
            <div className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-sm text-indigo-100/55 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Celebration Marketplace. All rights reserved.</p><div className="flex gap-5"><Link to="/about" className="hover:text-white">About</Link><Link to="/services" className="hover:text-white">Services</Link></div></div></div>
        </footer>
    );
};

export default Footer;
