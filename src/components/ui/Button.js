import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  title,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 
      text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-blue-500
      ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''}
    `,
    secondary: `
      bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400
      shadow-sm hover:shadow-md focus:ring-gray-500
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `,
    success: `
      bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700
      text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-green-500
      ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''}
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700
      text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-red-500
      ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''}
    `,
    warning: `
      bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700
      text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-amber-500
      ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''}
    `,
    ghost: `
      text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:ring-blue-500
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `,
    icon: `
      p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg focus:ring-blue-500
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `
  };

  const sizes = {
    xs: 'px-2 py-1 text-xs rounded-md',
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-sm rounded-xl',
    lg: 'px-8 py-4 text-base rounded-xl',
    xl: 'px-10 py-5 text-lg rounded-2xl'
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick?.(e);
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${variant !== 'icon' ? sizes[size] : 'p-2 rounded-lg'}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled || loading}
      title={title}
      {...props}
    >
      {loading && (
        <svg className={`animate-spin -ml-1 mr-2 ${iconSizes[size]} text-current`} fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {Icon && iconPosition === 'left' && !loading && (
        <Icon className={`${iconSizes[size]} ${children ? 'mr-2' : ''}`} />
      )}
      
      {children}
      
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className={`${iconSizes[size]} ${children ? 'ml-2' : ''}`} />
      )}
    </button>
  );
};

export default Button;
