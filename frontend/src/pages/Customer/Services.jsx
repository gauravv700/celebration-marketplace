import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { getAllServices } from "../../services/serviceService";
import ServiceCard from "../../components/ServiceCard/ServiceCard";

const Services = () => {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const maxPrice = searchParams.get("maxPrice") || "";

    useEffect(() => {
        const loadServices = async () => {
            try {
                const response = await getAllServices();

                if (response.success) {
                    setServices(response.services);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadServices();
    }, []);

    const filteredServices = useMemo(() => services.filter((service) => {
        const matchesSearch = !search || [service.title, service.description, service.category]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(search.toLowerCase()));
        const matchesCategory = !category || service.category === category;
        const matchesPrice = !maxPrice || Number(service.price) <= Number(maxPrice);
        return matchesSearch && matchesCategory && matchesPrice;
    }), [services, search, category, maxPrice]);

    const updateFilter = (key, value) => {
        const params = new URLSearchParams(searchParams);
        if (value) params.set(key, value);
        else params.delete(key);
        setSearchParams(params);
    };

    const clearFilters = () => setSearchParams({});

    if (loading) {
        return (
            <div className="py-20 text-center text-xl">
                Loading Services...
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-6 py-12">

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">Discover local talent</p>
            <h1 className="mt-2 text-4xl font-bold">Explore Services</h1>
            <p className="mt-2 text-gray-600">Search by service, occasion, or your event budget.</p>

            <div className="mt-8 grid gap-4 rounded-2xl border bg-white p-4 shadow-sm md:grid-cols-[1fr_190px_170px_auto]">
                <label className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3"><Search size={19} className="text-indigo-600" /><input value={search} onChange={(event) => updateFilter("search", event.target.value)} placeholder="Search services..." className="w-full bg-transparent text-sm outline-none" /></label>
                <select value={category} onChange={(event) => updateFilter("category", event.target.value)} className="rounded-xl bg-gray-50 px-4 py-3 text-sm outline-none"><option value="">All categories</option>{["Birthday", "Wedding", "Anniversary", "Corporate", "Baby Shower", "Engagement"].map((item) => <option key={item}>{item}</option>)}</select>
                <select value={maxPrice} onChange={(event) => updateFilter("maxPrice", event.target.value)} className="rounded-xl bg-gray-50 px-4 py-3 text-sm outline-none"><option value="">Any price</option><option value="10000">Up to ₹10,000</option><option value="25000">Up to ₹25,000</option><option value="50000">Up to ₹50,000</option></select>
                {(search || category || maxPrice) ? <button onClick={clearFilters} className="inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"><X size={17} /> Clear</button> : <div className="inline-flex items-center justify-center gap-2 px-3 text-sm font-medium text-gray-500"><SlidersHorizontal size={17} /> Filters</div>}
            </div>

            <p className="mt-6 text-sm text-gray-500">{filteredServices.length} service{filteredServices.length === 1 ? "" : "s"} found</p>

            {filteredServices?.length === 0 ? (
                <div className="mt-8 rounded-2xl border border-dashed p-12 text-center"><h2 className="text-xl font-bold">No services match your filters</h2><p className="mt-2 text-gray-600">Try a different category, search term, or budget.</p><button onClick={clearFilters} className="mt-5 font-semibold text-indigo-600">Clear filters</button></div>
            ) : (
                <div className="mt-5 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredServices.map(service => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                        />
                    ))}
                </div>
            )}

        </div>
    );

};

export default Services;
