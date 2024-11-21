import React from 'react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import type { DisciplinaryCase } from '../types';

const statusColors = {
  DRAFT: 'bg-gray-100 text-gray-800',
  OPEN: 'bg-yellow-100 text-yellow-800',
  CLOSED: 'bg-green-100 text-green-800',
};

const statusIcons = {
  DRAFT: Clock,
  OPEN: AlertCircle,
  CLOSED: CheckCircle2,
};

interface RecentCasesProps {
  cases: DisciplinaryCase[];
}

const RecentCases = ({ cases }: RecentCasesProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Cases</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {cases.map((case_) => {
          const StatusIcon = statusIcons[case_.status];
          return (
            <div key={case_.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <StatusIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {case_.title}
                    </h3>
                    <p className="text-sm text-gray-500">{case_.employeeName}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[case_.status]
                    }`}
                  >
                    {case_.status}
                  </span>
                  <span className="ml-4 text-sm text-gray-500">
                    {new Date(case_.incidentDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentCases;