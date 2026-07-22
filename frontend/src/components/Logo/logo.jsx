import { PartyPopper } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link
            to="/"
            className="flex items-center gap-2"
        >
            <PartyPopper
                className="text-indigo-600"
                size={30}
            />

            <span className="text-2xl font-bold text-indigo-600">
                PartyBook
            </span>
        </Link>
    );
};

export default Logo;