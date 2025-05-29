import React from 'react';
import { Clock, RefreshCw, Download } from 'lucide-react';
import Button from './Button';

const PageHeader = ({
  title,
  subtitle,
  icon: Icon,
  actions = [],
  showLastUpdated = true,
  showRefresh = true,
  showExport = true,
  onRefresh,
  onExport,
  className = ''
}) => {
  const defaultActions = [];

  if (showRefresh) {
    defaultActions.push({
      icon: RefreshCw,
      variant: 'icon',
      onClick: onRefresh || (() => window.location.reload()),
      title: 'Actualiser'
    });
  }

  if (showExport) {
    defaultActions.push({
      icon: Download,
      variant: 'ghost',
      size: 'sm',
      onClick: onExport,
      title: 'Exporter les données',
      children: <span className="hidden sm:inline">Exporter</span>
    });
  }

  const allActions = [...defaultActions, ...actions];

  return (
    <div className={`relative overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-100 ${className}`}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
      
      {/* Content */}
      <div className="relative px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Left Side - Title and Icon */}
          <div className="flex items-center space-x-4">
            {Icon && (
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <Icon className="h-8 w-8 text-white" />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                {title}
              </h1>
              {subtitle && (
                <p className="text-gray-600 mt-1 flex items-center">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          
          {/* Right Side - Actions */}
          <div className="flex items-center space-x-3">
            {/* Last Updated */}
            {showLastUpdated && (
              <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg border">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Mis à jour: {new Date().toLocaleString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    day: '2-digit',
                    month: '2-digit'
                  })}
                </span>
              </div>
            )}
            
            {/* Action Buttons */}
            {allActions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'primary'}
                size={action.size || 'md'}
                icon={action.icon}
                onClick={action.onClick}
                title={action.title}
                disabled={action.disabled}
                loading={action.loading}
                className={action.className}
              >
                {action.children}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
