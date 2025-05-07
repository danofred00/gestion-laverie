import React from 'react';
interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  loading?: boolean;
}
export function Card({
  children,
  title,
  subtitle,
  icon,
  className = '',
  padding = 'md',
  loading = false
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };
  return <div className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden ${className}`}>
      {(title || subtitle || icon) && <div className="border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            {icon && <div className="mr-3 text-blue-600">{icon}</div>}
            <div>
              {title && <h3 className="text-base font-medium text-gray-800">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
          </div>
        </div>}
      <div className={paddingClasses[padding]}>
        {loading ? <div className="animate-pulse flex flex-col space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div> : children}
      </div>
    </div>;
}