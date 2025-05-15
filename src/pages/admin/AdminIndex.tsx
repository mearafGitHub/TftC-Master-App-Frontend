
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminDashboard from "@/components/admin/AdminDashboard";

const AdminIndex = () => {
  return (
    <DashboardLayout isAdmin title="Admin Dashboard">
      <AdminDashboard />
    </DashboardLayout>
  );
};

export default AdminIndex;
