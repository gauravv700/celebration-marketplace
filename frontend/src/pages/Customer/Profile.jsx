import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { CalendarDays, CircleHelp, ReceiptIndianRupee } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();

  const details = [
    ["Full name", user?.full_name],
    ["Email", user?.email],
    ["Phone", user?.phone],
    ["Account type", user?.role],
  ];

  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="bg-indigo-600 px-8 py-10 text-white">
          <p className="text-sm font-medium uppercase tracking-wider text-indigo-100">My account</p>
          <h1 className="mt-2 text-3xl font-bold">{user?.full_name}</h1>
        </div>

        <div className="grid gap-6 p-8 sm:grid-cols-2">
          {details.map(([label, value]) => (
            <div key={label} className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">{label}</p>
              <p className={`mt-1 break-words font-semibold text-gray-900 ${label === "Account type" ? "capitalize" : ""}`}>{value || "Not provided"}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Account activity</h2>
        <p className="mt-1 text-gray-600">View your bookings and the current status of support requests.</p>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <NavLink
            to="/my-bookings"
            className="group rounded-xl border bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow"
          >
            <CalendarDays className="h-6 w-6 text-indigo-600" />
            <h3 className="mt-4 font-bold text-gray-900 group-hover:text-indigo-600">My bookings</h3>
            <p className="mt-1 text-sm text-gray-600">See upcoming and previous bookings.</p>
            <span className="mt-4 inline-block text-sm font-semibold text-indigo-600">View bookings →</span>
          </NavLink>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <ReceiptIndianRupee className="h-6 w-6 text-amber-600" />
            <h3 className="mt-4 font-bold text-gray-900">Refund history</h3>
            <p className="mt-1 text-sm text-gray-600">Refund requests and completed refunds will appear here.</p>
            <span className="mt-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">No refund records</span>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <CircleHelp className="h-6 w-6 text-rose-600" />
            <h3 className="mt-4 font-bold text-gray-900">Complaint status</h3>
            <p className="mt-1 text-sm text-gray-600">Track updates for any complaints you submit.</p>
            <span className="mt-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">No open complaints</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
