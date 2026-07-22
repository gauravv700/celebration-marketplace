import { useAuth } from "../../context/AuthContext";

const Navbar = () => {

    const { user } = useAuth();

    return (

        <header className="flex items-center justify-between bg-white p-5 shadow">

            <h1 className="text-2xl font-bold">

                Vendor Dashboard

            </h1>

            <div>

                Welcome,

                <span className="ml-2 font-semibold">

                    {user.full_name}

                </span>

            </div>

        </header>

    );

};

export default Navbar;