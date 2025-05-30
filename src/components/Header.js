import React from 'react';

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="buLogo.png"
            className="h-10 w-auto"
            alt="Company Logo"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h1 className="text-2xl font-bold text-gray-800">
            Engine Management System
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          
        </div>
      </div>
    </header>
  );
}

export default Header;
