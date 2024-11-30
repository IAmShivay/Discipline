import React, { useState } from 'react';
import { LayoutDashboard, Users, FileText, Settings as SettingsIcon, Bell, Menu, X, PersonStandingIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserProfileMenu from './UserProfileMenu';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.verify
  );
  const role = user?.role || '';
  const menuItems = [
    
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Employees', path: '/employees' },
    { icon: FileText, label: 'Cases', path: '/cases' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: SettingsIcon, label: 'Settings', path: '/settings' },
    { icon: PersonStandingIcon, label: 'Roles', path: '/roles' },

  ];
  const getFilteredMenuItems = (role: string) => {
    if (role === 'employee') {
      return menuItems?.filter(item => ['Cases', 'Settings'].includes(item.label));
    }
    return menuItems; // Default to all menu items for other roles
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-900 text-white"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 z-40 bg-gray-900 text-white w-64 min-h-screen p-4 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div 
          className="flex items-center space-x-2 mb-8 cursor-pointer" 
          onClick={() => {
            navigate('/');
            if (window.innerWidth < 1024) setIsOpen(false);
          }}
        >
          <FileText className="w-8 h-8 text-blue-400" />
          <span className="text-xl font-bold">DisciplineHR</span>
        </div>
        
        <nav className="flex-1">
          {getFilteredMenuItems(role).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={`flex items-center space-x-3 w-full p-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-800">
          <UserProfileMenu />
        </div>
      </div>
    </>
  );
};

export default Sidebar;