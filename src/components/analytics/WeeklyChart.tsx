import React from 'react';
import { TrendingDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface WeeklyChartProps {
  data: Array<{
    day: string;
    hours: number;
    blocked: number;
  }>;
  trend: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

const WeeklyChart: React.FC<WeeklyChartProps> = ({ data, trend, className = '' }) => {
  const { t } = useLanguage();
  const maxHours = 6;
  const yAxisSteps = [6, 5, 4, 3, 2, 1, 0];

  const createPath = (values: number[]) => {
    const points = values.map((value, index) => ({
      x: (index * 80) / (values.length - 1) + 10,
      y: 90 - (value / maxHours) * 70
    }));

    return points.reduce((path, point, index) => {
      if (index === 0) return `M ${point.x},${point.y}`;
      const prev = points[index - 1];
      const cp1x = prev.x + (point.x - prev.x) / 3;
      const cp2x = point.x - (point.x - prev.x) / 3;
      return `${path} C ${cp1x},${prev.y} ${cp2x},${point.y} ${point.x},${point.y}`;
    }, '');
  };

  return (
    <div className={`bg-gradient-to-br ${className} rounded-xl p-4 text-white`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold">{t('weeklyDynamics')}</h3>
        <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg">
          <TrendingDown size={14} className="text-red-300" />
          <span className="text-xs font-medium text-red-300">{trend.value}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white" />
          <span className="text-xs">{t('totalTime')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white/50" />
          <span className="text-xs">{t('blockedTime')}</span>
        </div>
      </div>

      <div className="relative h-44">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-2 bottom-6 w-6 flex flex-col justify-between text-[10px] text-white/70">
          {yAxisSteps.map((value) => (
            <span key={value}>{value}h</span>
          ))}
        </div>

        <div className="ml-6 h-full">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Grid lines */}
            {yAxisSteps.map((_, index) => (
              <line
                key={index}
                x1="10"
                y1={20 + index * 10}
                x2="90"
                y2={20 + index * 10}
                stroke="white"
                strokeOpacity="0.1"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
            ))}

            {/* Total time line */}
            <path
              d={createPath(data.map(d => d.hours))}
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              filter="url(#glow)"
            />

            {/* Blocked time line */}
            <path
              d={createPath(data.map(d => d.blocked))}
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.5"
              strokeDasharray="3 3"
            />

            {/* Data points */}
            {data.map((point, index) => {
              const x = (index * 80) / (data.length - 1) + 10;
              const y = 90 - (point.hours / maxHours) * 70;
              const blockedY = 90 - (point.blocked / maxHours) * 70;
              return (
                <g key={point.day}>
                  <circle
                    cx={x}
                    cy={y}
                    r="2"
                    fill="white"
                    filter="url(#glow)"
                  />
                  <circle
                    cx={x}
                    cy={blockedY}
                    r="1.5"
                    fill="white"
                    fillOpacity="0.5"
                  />
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2.5">
            {data.map((point) => (
              <div key={point.day} className="text-center">
                <p className="text-[10px] font-medium">{point.day}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 bg-white/10 p-2.5 rounded-lg">
        <p className="text-xs opacity-80">{t('hoursSpent')}</p>
        <p className="text-xl font-bold leading-tight">
          {data.reduce((acc, curr) => acc + curr.hours, 0).toFixed(1)}h
        </p>
      </div>
    </div>
  );
};

export default WeeklyChart;