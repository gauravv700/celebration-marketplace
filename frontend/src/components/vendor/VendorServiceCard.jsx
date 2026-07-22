import { Link } from "react-router-dom";
import { Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { deleteService } from "../../services/serviceService";

const VendorServiceCard = ({ service, reload }) => {

    const handleDelete = async () => {

        if (!window.confirm("Delete this service?")) {
            return;
        }

        try {

            await deleteService(service.id);
            toast.success("Service Deleted");
            reload();

        } catch {

            toast.error("Unable to delete");

        }

    };

    return (

        <div className="rounded-xl bg-white shadow">

            <img
                src={
                    service.image_url ||
                    "https://placehold.co/600x400"
                }
                className="h-52 w-full rounded-t-xl object-cover"
            />

            <div className="space-y-3 p-5">

                <h2 className="text-xl font-bold">

                    {service.title}

                </h2>

                <p>

                    ₹{service.price}

                </p>

                <p>

                    Capacity : {service.capacity}

                </p>

                <div className="flex gap-3">

                    <Link

                        to={`/vendor/services/edit/${service.id}`}

                        className="rounded bg-blue-600 px-4 py-2 text-white"

                    >

                        <Pencil size={18} />

                    </Link>

                    <button

                        onClick={handleDelete}

                        className="rounded bg-red-600 px-4 py-2 text-white"

                    >

                        <Trash2 size={18} />

                    </button>

                </div>

            </div>

        </div>

    );

};

export default VendorServiceCard;