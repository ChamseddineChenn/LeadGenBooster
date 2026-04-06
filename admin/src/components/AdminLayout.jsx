import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar onCollapse={setSidebarCollapsed} />
      {/* Main Content - margin adjusts dynamically with sidebar */}
      <main
        className={`flex-1 transition-all duration-300 p-8 ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
