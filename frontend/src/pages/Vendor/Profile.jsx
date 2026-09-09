import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getVendorProfile } from "../../services/vendorService";

const Profile = () => {
  const { user } = useAuth();
  const [vendor, setVendor] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getVendorProfile();
        setVendor(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load business details.");
      }
    };

    loadProfile();
  }, []);

  const personalDetails = [
    ["Full name", user?.full_name],
    ["Email", user?.email],
    ["Phone", user?.phone],
  ];

  return (
    <section className="mx-auto max-w-5xl p-8">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wider text-indigo-600">Vendor account</p>
        <h1 className="mt-1 text-3xl font-bold text-gray-900">My Profile</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Personal details</h2>
          <div className="mt-5 space-y-4">
            {personalDetails.map(([label, value]) => (
              <div key={label}>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="mt-1 break-words font-medium text-gray-900">{value || "Not provided"}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Business details</h2>
          {error ? (
            <p className="mt-5 text-red-600">{error}</p>
          ) : !vendor ? (
            <p className="mt-5 text-gray-500">Loading business details...</p>
          ) : (
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Business name</p>
                <p className="mt-1 font-medium text-gray-900">{vendor.business_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="mt-1 whitespace-pre-wrap text-gray-900">{vendor.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="mt-1 text-gray-900">{vendor.address}, {vendor.city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Business phone</p>
                <p className="mt-1 text-gray-900">{vendor.phone}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
