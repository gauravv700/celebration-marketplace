import { ArrowUpRight, ImageIcon, MapPin, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
    const vendor = Array.isArray(service.vendors) ? service.vendors[0] : service.vendors;
    const location = vendor?.city || service.location || "Location on request";
    const formattedPrice = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(Number(service.price) || 0);

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-950/10">

            {/* IMAGE */}
            <div className="relative h-64 overflow-hidden bg-indigo-950 sm:h-60">
                {service.image_url ? (
                    <img
                        src={service.image_url}
                        alt={service.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_top_left,#5b4ca7,#201a40_65%)] text-indigo-100">
                        <ImageIcon size={36} className="text-amber-300" />
                        <span className="mt-3 text-sm font-medium">
                            Service image coming soon
                        </span>
                    </div>
                )}

                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#17142d]/75 via-transparent to-transparent" />

                {/* Category */}
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#17142d]/75 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                    {service.category}
                </span>

                {/* Vendor */}
                {vendor?.business_name && (
                    <p className="absolute bottom-4 left-4 right-4 truncate text-xs font-medium text-white/90">
                        by {vendor.business_name}
                    </p>
                )}
            </div>

            {/* CONTENT */}
            <div className="flex flex-1 flex-col p-4">

                {/* Title */}
                <h2 className="line-clamp-1 text-lg font-bold tracking-tight text-gray-900">
                    {service.title}
                </h2>

                {/* Description */}
                <p className="mt-1 line-clamp-1 text-sm text-gray-600">
                    {service.description}
                </p>

                {/* Capacity + Location */}
                <div className="mt-3 grid grid-cols-2 gap-2.5">

                    <div className="rounded-xl bg-stone-50 px-3 py-2.5">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                            <UsersRound
                                size={14}
                                className="text-indigo-600"
                            />
                            Capacity
                        </div>

                        <p className="mt-0.5 text-sm font-bold text-gray-900">
                            {service.capacity || "—"} guests
                        </p>
                    </div>

                    <div className="rounded-xl bg-stone-50 px-3 py-2.5">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                            <MapPin
                                size={14}
                                className="text-indigo-600"
                            />
                            Location
                        </div>

                        <p className="mt-0.5 truncate text-sm font-bold text-gray-900">
                            {location}
                        </p>
                    </div>

                </div>

                {/* PRICE + BUTTON */}
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">

                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                            Service price
                        </p>

                        <p className="text-xl font-bold text-indigo-700">
                            {formattedPrice}
                        </p>
                    </div>

                    <Link
                        to={`/services/${service.id}`}
                        aria-label={`View ${service.title}`}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        View details
                        <ArrowUpRight size={16} />
                    </Link>

                </div>
            </div>
        </article>
    );
};

export default ServiceCard;
