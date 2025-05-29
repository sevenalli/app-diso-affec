import React from 'react';

const Layout = ({ 
  children, 
  className = '',
  maxWidth = '7xl',
  padding = 'default' 
}) => {
  const maxWidthClasses = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    'full': 'max-w-full'
  };

  const paddingClasses = {
    none: '',
    sm: 'px-2 sm:px-4 lg:px-6 py-4',
    default: 'px-4 sm:px-6 lg:px-8 py-8',
    lg: 'px-6 sm:px-8 lg:px-12 py-12'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className={`
        ${maxWidthClasses[maxWidth]} mx-auto 
        ${paddingClasses[padding]} 
        space-y-8 
        ${className}
      `}>
        {children}
      </div>
    </div>
  );
};

// Grid Layout Component
const Grid = ({ 
  children, 
  cols = 'auto',
  gap = '6',
  className = '' 
}) => {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-6',
    auto: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-auto'
  };

  const gapClasses = {
    2: 'gap-2',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    12: 'gap-12'
  };

  return (
    <div className={`
      grid ${colClasses[cols]} ${gapClasses[gap]} 
      ${className}
    `}>
      {children}
    </div>
  );
};

// Section Component
const Section = ({ 
  children, 
  title, 
  subtitle,
  className = '' 
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {(title || subtitle) && (
        <div>
          {title && (
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

// Card Component
const Card = ({ 
  children, 
  className = '',
  padding = 'default',
  shadow = 'default' 
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    default: 'shadow-lg',
    lg: 'shadow-xl',
    xl: 'shadow-2xl'
  };

  return (
    <div className={`
      bg-white rounded-2xl border border-gray-100 
      ${shadowClasses[shadow]} 
      ${paddingClasses[padding]} 
      ${className}
    `}>
      {children}
    </div>
  );
};

Layout.Grid = Grid;
Layout.Section = Section;
Layout.Card = Card;

export default Layout;
