import React from 'react';
import { Filter, RefreshCw, Search } from 'lucide-react';
import Button from './Button';

const FilterBar = ({
  title = "Filtres Avancés",
  subtitle = "Affinez votre recherche avec précision",
  onClearFilters,
  children,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Filter className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-600">{subtitle}</p>
            </div>
          </div>
          {onClearFilters && (
            <Button
              variant="ghost"
              size="sm"
              icon={RefreshCw}
              onClick={onClearFilters}
            >
              Réinitialiser
            </Button>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

// Filter Input Component
const FilterInput = ({
  label,
  emoji,
  type = 'text',
  placeholder,
  value,
  onChange,
  options = [],
  clearable = false,
  className = ''
}) => {
  const isSelect = type === 'select';
  const isSearch = type === 'search';

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-semibold text-gray-700">
        {emoji && `${emoji} `}{label}
      </label>
      
      {isSelect ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
        >
          <option value="">{placeholder || `Tous les ${label}`}</option>
          {options.map((option) => (
            <option key={option.value || option} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          {isSearch && (
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          )}
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`
              w-full px-4 py-3 border border-gray-200 rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              transition-all duration-200 bg-gray-50 hover:bg-white
              ${isSearch ? 'pl-12 pr-4' : ''}
            `}
          />
          {clearable && value && (
            <button
              onClick={() => onChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Filter Grid Layout Component
const FilterGrid = ({ children, columns = 'auto' }) => {
  const gridClasses = {
    auto: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-auto',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-6'
  };

  return (
    <div className={`grid ${gridClasses[columns] || gridClasses.auto} gap-6`}>
      {children}
    </div>
  );
};

FilterBar.Input = FilterInput;
FilterBar.Grid = FilterGrid;

export default FilterBar;
