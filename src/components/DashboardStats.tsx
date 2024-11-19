import React from 'react';
import { AlertCircle, CheckCircle2, Clock, Files } from 'lucide-react';
import type { DashboardStats } from '../types';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatsCard = ({ title, value, icon, color }: StatsCardProps) => (
  <div className="bg-white rounded-lg p-6 shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className={`${color} p-3 rounded-full`}>
        {icon}
      </div>
    </div>
  </div>
);

const DashboardStats = ({ stats }: { stats: DashboardStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Cases"
        value={stats.totalCases}
        icon={<Files className="w-6 h-6 text-blue-600" />}
        color="bg-blue-100"
      />
      <StatsCard
        title="Open Cases"
        value={stats.openCases}
        icon={<Clock className="w-6 h-6 text-yellow-600" />}
        color="bg-yellow-100"
      />
      <StatsCard
        title="Closed Cases"
        value={stats.closedCases}
        icon={<CheckCircle2 className="w-6 h-6 text-green-600" />}
        color="bg-green-100"
      />
      <StatsCard
        title="Pending Actions"
        value={stats.pendingActions}
        icon={<AlertCircle className="w-6 h-6 text-red-600" />}
        color="bg-red-100"
      />
    </div>
  );
};

export default DashboardStats;