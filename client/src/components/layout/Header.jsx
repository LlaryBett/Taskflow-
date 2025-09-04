import React, { useState } from 'react';
import { Menu, Search, Bell, User, Settings, LogOut, Play, Pause } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTimer } from '../../hooks/useTimer';

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { isRunning, currentTask, duration, startTimer, stopTimer } = useTimer();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-gray-200">
      <button
        onClick={onMenuClick}
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>
      
      <div className="flex-1 px-4 flex justify-between items-center">
        {/* Search */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search projects, tasks..."
            />
          </div>
        </div>

        <div className="ml-4 flex items-center md:ml-6 space-x-4">
          {/* Timer Widget */}
          <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg">
            <button
              onClick={isRunning ? stopTimer : startTimer}
              className={`p-2 rounded-full ${isRunning ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'} hover:opacity-80 transition-colors`}
            >
              {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <div className="text-sm">
              <div className="font-medium">{duration}</div>
              <div className="text-gray-500 text-xs">
                {currentTask || 'No task selected'}
              </div>
            </div>
          </div>

          {/* Notifications */}
          <button className="p-2 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full">
            <Bell className="h-6 w-6" />
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 text-sm rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={user?.avatar}
                alt={user?.name}
              />
              <span className="hidden md:block font-medium text-gray-700">{user?.name}</span>
            </button>

            {showUserMenu && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <User className="h-4 w-4 mr-3" />
                  Your Profile
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </a>
                <button
                  onClick={logout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;