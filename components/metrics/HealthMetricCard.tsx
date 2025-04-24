import { ReactNode } from 'react';

interface HealthMetricCardProps {
  title: string;
  value: string | number;
  max?: string | number;
  unit?: string;
  progress?: number;
  icon?: ReactNode;
  color?: 'indigo' | 'green' | 'blue' | 'red' | 'yellow' | 'purple' | 'primary';
  subtitle?: string;
  invert?: boolean;
}

const HealthMetricCard = ({
  title,
  value,
  max,
  unit = '',
  progress,
  icon,
  color = 'indigo',
  subtitle,
  invert = false
}: HealthMetricCardProps) => {
  const colorClasses = {
    indigo: {
      bg: 'bg-indigo-100 dark:bg-indigo-900/30',
      text: 'text-indigo-600 dark:text-indigo-400',
      bar: 'bg-indigo-500'
    },
    green: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-600 dark:text-green-400',
      bar: 'bg-green-500'
    },
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-600 dark:text-blue-400',
      bar: 'bg-blue-500'
    },
    red: {
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-600 dark:text-red-400',
      bar: 'bg-red-500'
    },
    yellow: {
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      text: 'text-yellow-600 dark:text-yellow-400',
      bar: 'bg-yellow-500'
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-600 dark:text-purple-400',
      bar: 'bg-purple-500'
    },
    primary: {
      bg: 'bg-primary-light dark:bg-primary-dark/30',
      text: 'text-primary dark:text-primary-light',
      bar: 'bg-primary'
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-neutral-700 dark:text-white">{title}</h3>
        {icon && (
          <div className={`p-3 ${colorClasses[color].bg} rounded-full`}>
            <div className={colorClasses[color].text}>{icon}</div>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {subtitle ? subtitle : 'Current'}
          </span>
          <span className="text-sm font-medium dark:text-white">
            {value}
            {max ? ` / ${max}` : ''} {unit}
          </span>
        </div>
        {progress !== undefined && (
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
            <div 
              className={`${colorClasses[color].bar} h-2 rounded-full`} 
              style={{ 
                width: `${Math.min(100, progress)}%`,
                backgroundColor: invert ? `var(--${color}-${100 - Math.min(100, progress)})` : undefined 
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthMetricCard; 