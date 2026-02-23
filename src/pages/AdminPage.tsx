import AdminDashboard from "@/components/admin/AdminDashboard";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

const AdminPage = () => (
  <ProtectedRoute>
    <AdminDashboard />
  </ProtectedRoute>
);

export default AdminPage;
