import { PartyPopper } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link
            to="/"
            className="flex items-center gap-2.5"
        >
            <PartyPopper
                className="text-amber-300"
                size={27}
            />

            <span className="text-base font-bold tracking-tight text-white sm:text-lg">
                Celebration <span className="text-amber-300">Marketplace</span>
            </span>
        </Link>
    );
};

export default Logo;
