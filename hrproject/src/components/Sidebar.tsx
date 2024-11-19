import { LayoutDashboard, Users, FileText, Settings as SettingsIcon, Bell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserProfileMenu from './UserProfileMenu';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Employees', path: '/app/employees' },
    { icon: FileText, label: 'Cases', path: '/app/cases' },
    { icon: Bell, label: 'Notifications', path: '/app/notifications' },
    { icon: SettingsIcon, label: 'Settings', path: '/app/settings' },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4 flex flex-col">
      <div 
        className="flex items-center space-x-2 mb-8 cursor-pointer" 
        onClick={() => navigate('/')}
      >
        <FileText className="w-8 h-8 text-blue-400" />
        <span className="text-xl font-bold">DisciplineHR</span>
      </div>
      
      <nav className="flex-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
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
  );
};

export default Sidebar;