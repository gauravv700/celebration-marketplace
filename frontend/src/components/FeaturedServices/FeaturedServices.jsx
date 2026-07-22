import { useEffect, useState } from "react";
import { getAllServices } from "../../services/serviceService";
import ServiceCard from "../ServiceCard/ServiceCard";

const FeaturedServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await getAllServices();
            setServices(response.services);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="py-20 text-center">Loading...</div>;
    }

    if (services.length === 0) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-2xl font-bold">No Services Available</h2>
            </div>
        );
    }

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
            ))}
        </div>
    );
};

export default FeaturedServices;
