import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Settings,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
  Home,
  Wrench
} from 'lucide-react';

function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      path: '/',
      name: 'Dashboard',
      icon: Home
    },
    {
      path: '/engines',
      name: 'Engines',
      icon: Wrench
    },
    {
      path: '/disponibility',
      name: 'Disponibility',
      icon: Calendar
    },
    {
      path: '/affectation',
      name: 'Affectation',
      icon: Users
    },
    {
      path: '/settings',
      name: 'Settings',
      icon: Settings
    }
  ];

  return (
    <div className={`
      bg-slate-800 text-white flex flex-col min-h-screen shadow-lg transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-16' : 'w-64'}
    `}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-white">
              CMMS
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center p-3 rounded-lg transition-all duration-200
                    ${isActive(item.path)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }
                    ${isCollapsed ? 'justify-center' : 'justify-start'}
                  `}
                  title={isCollapsed ? item.name : ''}
                >
                  <IconComponent className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="ml-3 font-medium">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        {!isCollapsed && (
          <div className="text-xs text-slate-400 text-center">
            Engine Management System
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;

