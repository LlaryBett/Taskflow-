import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  FolderOpen, 
  Users, 
  Calendar,
  CheckSquare,
  BarChart3,
  User,
  X
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard', icon: Home },
  { name: 'Projects', href: '/app/projects', icon: FolderOpen },
  { name: 'Teams', href: '/app/teams', icon: Users },
  { name: 'Calendar', href: '/app/calendar', icon: Calendar },
  { name: 'My Tasks', href: '/app/my-tasks', icon: CheckSquare },
];

const Sidebar = ({ onClose }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center h-16 flex-shrink-0 px-4 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
        </div>
        <button
          onClick={onClose}
          className="ml-auto p-2 text-gray-400 hover:text-gray-600 lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex-1">
        <div className="px-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon
                className="flex-shrink-0 h-5 w-5 mr-3"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* User info */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200">
        <NavLink
          to="/app/profile"
          className="group block w-full flex items-center space-x-3 p-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <User className="h-5 w-5" />
          <span>Profile Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;