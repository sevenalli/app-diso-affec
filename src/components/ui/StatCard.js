import React from 'react';

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  color = 'blue',
  progress,
  progressLabel,
  className = '',
  onClick
}) => {
  const colorVariants = {
    blue: {
      bg: 'from-blue-50 to-indigo-50',
      iconBg: 'from-blue-500 to-indigo-600',
      trendColor: 'text-blue-500'
    },
    green: {
      bg: 'from-green-50 to-emerald-50',
      iconBg: 'from-green-500 to-emerald-600',
      trendColor: 'text-green-500'
    },
    red: {
      bg: 'from-red-50 to-rose-50',
      iconBg: 'from-red-500 to-rose-600',
      trendColor: 'text-red-500'
    },
    purple: {
      bg: 'from-purple-50 to-violet-50',
      iconBg: 'from-purple-500 to-violet-600',
      trendColor: 'text-purple-500'
    },
    amber: {
      bg: 'from-amber-50 to-orange-50',
      iconBg: 'from-amber-500 to-orange-600',
      trendColor: 'text-amber-500'
    },
    gray: {
      bg: 'from-gray-50 to-slate-50',
      iconBg: 'from-gray-500 to-slate-600',
      trendColor: 'text-gray-500'
    }
  };

  const currentColor = colorVariants[color] || colorVariants.blue;

  return (
    <div 
      className={`
        relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 
        hover:shadow-xl transition-all duration-300 group cursor-pointer
        ${className}
      `}
      onClick={onClick}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentColor.bg} opacity-50`}></div>
      
      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Icon */}
            {Icon && (
              <div className={`
                p-3 bg-gradient-to-br ${currentColor.iconBg} rounded-xl shadow-lg 
                group-hover:scale-110 transition-transform duration-300
              `}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            )}
            
            {/* Main Content */}
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {title}
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {value}
              </p>
              {subtitle && (
                <p className="text-xs text-gray-500 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          
          {/* Trend Indicator */}
          {trend && (
            <div className="text-right">
              <trend className={`h-5 w-5 ${currentColor.trendColor} mb-1`} />
              {trendValue && (
                <p className={`text-xs font-medium ${currentColor.trendColor}`}>
                  {trendValue}
                </p>
              )}
            </div>
          )}
        </div>
        
        {/* Progress Bar */}
        {progress !== undefined && (
          <div className="mt-4">
            {progressLabel && (
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>{progressLabel}</span>
                <span className="font-medium">{progress}%</span>
              </div>
            )}
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className={`bg-gradient-to-r ${currentColor.iconBg} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
