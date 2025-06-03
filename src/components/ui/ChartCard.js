import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ChartCard = ({
  title,
  subtitle,
  type = 'line',
  data = [],
  dataKey,
  dataKeys = [], // For multiple series
  xAxisKey = 'name',
  color = 'blue',
  colors = [], // For multiple colors
  height = 300,
  showGrid = true,
  showLegend = true,
  className = '',
  children,
  actions
}) => {
  const colorVariants = {
    blue: {
      primary: '#3B82F6',
      secondary: '#60A5FA',
      gradient: ['#3B82F6', '#1D4ED8']
    },
    green: {
      primary: '#10B981',
      secondary: '#34D399',
      gradient: ['#10B981', '#059669']
    },
    red: {
      primary: '#EF4444',
      secondary: '#F87171',
      gradient: ['#EF4444', '#DC2626']
    },
    purple: {
      primary: '#8B5CF6',
      secondary: '#A78BFA',
      gradient: ['#8B5CF6', '#7C3AED']
    },
    amber: {
      primary: '#F59E0B',
      secondary: '#FBBF24',
      gradient: ['#F59E0B', '#D97706']
    }
  };

  const currentColor = colorVariants[color] || colorVariants.blue;

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (type) {
      case 'line':
        const lineColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
        const seriesToRender = dataKeys.length > 0 ? dataKeys : [dataKey];

        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
            <XAxis
              dataKey={xAxisKey}
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            {showLegend && <Legend />}
            {seriesToRender.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index] || lineColors[index] || currentColor.primary}
                strokeWidth={3}
                dot={{ fill: colors[index] || lineColors[index] || currentColor.primary, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: colors[index] || lineColors[index] || currentColor.primary, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
            <XAxis
              dataKey={xAxisKey}
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            {showLegend && <Legend />}
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentColor.primary} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={currentColor.primary} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={currentColor.primary}
              strokeWidth={2}
              fill={`url(#gradient-${color})`}
            />
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
            <XAxis
              dataKey={xAxisKey}
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            {showLegend && <Legend />}
            <Bar
              dataKey={dataKey}
              fill={currentColor.primary}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );

      case 'pie':
        const COLORS = [
          currentColor.primary,
          currentColor.secondary,
          '#F59E0B',
          '#EF4444',
          '#8B5CF6'
        ];

        return (
          <PieChart {...commonProps}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );

      default:
        return <div>Chart type not supported</div>;
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          {actions && (
            <div className="flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
      </div>

      {/* Chart Content */}
      <div className="p-6">
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
