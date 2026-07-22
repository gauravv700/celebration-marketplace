import StatCard from "../../components/vendor/StatCard";

const Dashboard = () => {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Services" value="0" color="text-blue-600" />

        <StatCard title="Pending" value="0" color="text-yellow-600" />

        <StatCard title="Completed" value="0" color="text-green-600" />

        <StatCard title="Revenue" value="₹0" color="text-indigo-600" />
      </div>
    </>
  );
};

export default Dashboard;
