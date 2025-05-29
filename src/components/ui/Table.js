import React from 'react';

const Table = ({
  title,
  subtitle,
  icon: Icon,
  headerColor = 'blue',
  data = [],
  columns = [],
  onRowClick,
  className = '',
  children
}) => {
  const colorVariants = {
    blue: 'from-blue-500 to-indigo-600',
    green: 'from-green-500 to-emerald-600',
    red: 'from-red-500 to-rose-600',
    purple: 'from-purple-500 to-violet-600',
    amber: 'from-amber-500 to-orange-600'
  };

  const headerGradient = colorVariants[headerColor] || colorVariants.blue;

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${className}`}>
      {/* Header */}
      {(title || Icon) && (
        <div className={`bg-gradient-to-r ${headerGradient} px-6 py-5 text-white`}>
          <div className="relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {Icon && (
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold">{title}</h2>
                  {subtitle && <p className="text-blue-100 text-sm">{subtitle}</p>}
                </div>
              </div>
              {data.length > 0 && (
                <div className="text-right">
                  <div className="text-2xl font-bold">{data.length}</div>
                  <div className="text-blue-100 text-xs">Éléments</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          {/* Headers */}
          {columns.length > 0 && (
            <thead>
              <tr className="border-b border-gray-100">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gray-50/50"
                  >
                    {column.emoji && `${column.emoji} `}{column.label}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          
          {/* Body */}
          <tbody className="divide-y divide-gray-100">
            {children || (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200 group cursor-pointer"
                  onClick={() => onRowClick?.(row, rowIndex)}
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      {column.render ? column.render(row[column.key], row, rowIndex) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Table Row Component for custom rendering
const TableRow = ({ 
  children, 
  onClick, 
  className = '',
  hoverColor = 'blue' 
}) => {
  const hoverColors = {
    blue: 'hover:from-blue-50 hover:to-indigo-50',
    green: 'hover:from-green-50 hover:to-emerald-50',
    red: 'hover:from-red-50 hover:to-rose-50',
    purple: 'hover:from-purple-50 hover:to-violet-50',
    amber: 'hover:from-amber-50 hover:to-orange-50'
  };

  return (
    <tr
      className={`
        hover:bg-gradient-to-r ${hoverColors[hoverColor]} 
        transition-all duration-200 group cursor-pointer
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

// Table Cell Component
const TableCell = ({ children, className = '' }) => {
  return (
    <td className={`px-6 py-4 ${className}`}>
      {children}
    </td>
  );
};

// Status Badge Component
const StatusBadge = ({ 
  status, 
  variant = 'default',
  children 
}) => {
  const variants = {
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-amber-100 text-amber-800',
    info: 'bg-blue-100 text-blue-800',
    default: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {children || status}
    </span>
  );
};

// Action Buttons Component
const ActionButtons = ({ actions = [] }) => {
  return (
    <div className="flex items-center space-x-2">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className={`
            group flex items-center justify-center w-8 h-8 rounded-lg 
            ${action.color || 'bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700'}
            transition-all duration-200 hover:scale-110
          `}
          title={action.title}
        >
          {action.icon && <action.icon className="w-4 h-4" />}
        </button>
      ))}
    </div>
  );
};

Table.Row = TableRow;
Table.Cell = TableCell;
Table.StatusBadge = StatusBadge;
Table.ActionButtons = ActionButtons;

export default Table;
