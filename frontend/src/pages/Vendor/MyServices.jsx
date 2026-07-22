import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVendorServices } from "../../services/vendorService";
import VendorServiceCard from "@/components/vendor/VendorServiceCard";

const MyServices = () => {

  const [services, setServices] = useState([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await getVendorServices();
      setServices(response.services);
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div>

      <div className="mb-8 flex justify-between">

        <h1 className="text-3xl font-bold">

          My Services

        </h1>

        <Link
          to="/vendor/services/add"
          className="rounded-lg bg-indigo-600 px-5 py-3 text-white"
        >
          + Add Service
        </Link>

      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {services.map(service => (

          <VendorServiceCard
            key={service.id}
            service={service}
            reload={loadServices}
          />

        ))}

      </div>

    </div>

  );

};

export default MyServices;