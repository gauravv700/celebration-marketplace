import { useEffect, useState } from "react";
import { getAllServices } from "../../services/serviceService";
import ServiceCard from "../../components/ServiceCard/ServiceCard";

const Services = () => {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadServices();
    }, []);

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

    if (loading) {
        return (
            <div className="py-20 text-center text-xl">
                Loading Services...
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-6 py-12">

            <h1 className="mb-10 text-4xl font-bold">
                Explore Services
            </h1>

            {services.length === 0 ? (
                <p>No services found.</p>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map(service => (
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