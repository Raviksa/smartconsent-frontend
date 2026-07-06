import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children
}) {
  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="dashboard-main">
        {children}
      </div>

    </div>
  );
}