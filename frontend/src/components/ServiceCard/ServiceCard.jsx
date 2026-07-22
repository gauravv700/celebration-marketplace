import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
    return (
        <div className="overflow-hidden rounded-xl border bg-white shadow-md transition hover:shadow-xl">

            <img
                src={
                    service.image_url ||
                    "https://placehold.co/600x400?text=No+Image"
                }
                alt={service.title}
                className="h-56 w-full object-cover"
            />

            <div className="space-y-3 p-5">

                <h2 className="text-xl font-bold">
                    {service.title}
                </h2>
                <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">
                    {service.category}
                </span>

                <p className="line-clamp-2 text-gray-600">
                    {service.description}
                </p>
                <p className="text-sm text-gray-500">
                    Capacity: {service.capacity} Guests
                </p>

                <div className="flex items-center gap-2 text-gray-500">

                    <MapPin size={18} />

                    {service.location}

                </div>

                <div className="flex items-center justify-between">

                    <span className="text-xl font-bold text-indigo-600">

                        ₹{service.price}

                    </span>

                    <Link
                        to={`/services/${service.id}`}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
                    >
                        Book Now
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default ServiceCard;