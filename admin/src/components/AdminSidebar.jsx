import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  CalendarCheck,
  FileSpreadsheet,
  Mail,
  BookOpen,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import * as assets from '../assets/assets';
import { useAuth } from '../context/useAuth';

const AdminSidebar = ({ onCollapse }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/',
    },
    {
      label: 'Blogs',
      icon: FileText,
      href: '/blogs',
    },
    {
      label: 'Carrières',
      icon: Briefcase,
      href: '/careers',
    },
    {
      label: 'Candidatures',
      icon: Users,
      href: '/applications',
    },
    {
      label: 'Rendez-vous',
      icon: CalendarCheck,
      href: '/meetings',
    },
    {
      label: 'Devis',
      icon: FileSpreadsheet,
      href: '/quotations',
    },
    {
      label: 'Newsletter',
      icon: Mail,
      href: '/newsletter',
    },
    {
      label: 'Guides',
      icon: BookOpen,
      href: '/guides',
    },
  ];

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const handleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    if (onCollapse) onCollapse(next);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-black text-white flex flex-col transition-all duration-300 z-50 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-6 border-b border-gray-800">
        <Link to="/" className="flex items-center gap-3 overflow-hidden">
          <img
            src={assets.logoWhite}
            alt="LeadGen Booster"
            className={`h-20 w-auto transition-all duration-300 ${
              collapsed ? 'mx-auto' : ''
            }`}
          />
        </Link>
      </div>

      {/* Toggle Button */}
      <button
        onClick={handleCollapse}
        className="absolute -right-3 top-24 w-6 h-6 bg-[#D71C1C] rounded-full flex items-center justify-center shadow-lg hover:bg-[#B01818] transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-white" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-white" />
        )}
      </button>

      {/* Navigation Links */}
      <nav className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                    active
                      ? 'bg-[#D71C1C] text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                  title={collapsed ? item.label : ''}
                >
                  <IconComponent
                    className={`w-5 h-5 shrink-0 ${
                      active
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-white'
                    }`}
                  />
                  {!collapsed && (
                    <span className="font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="px-3 py-6 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-400 hover:bg-[#D71C1C] hover:text-white transition-all duration-200 w-full group"
          title={collapsed ? 'Déconnexion' : ''}
        >
          <LogOut className="w-5 h-5 shrink-0 group-hover:text-white" />
          {!collapsed && (
            <span className="font-medium whitespace-nowrap">Déconnexion</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
