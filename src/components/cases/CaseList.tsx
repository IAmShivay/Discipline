import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import type { DisciplinaryCase } from '../../types';

interface CaseListProps {
  cases: DisciplinaryCase[];
}

const statusColors = {
  DRAFT: 'bg-gray-100 text-gray-800',
  OPEN: 'bg-blue-100 text-blue-800',
  PENDING_RESPONSE: 'bg-yellow-100 text-yellow-800',
  UNDER_REVIEW: 'bg-purple-100 text-purple-800',
  CLOSED: 'bg-green-100 text-green-800',
};

const statusIcons = {
  DRAFT: Clock,
  OPEN: AlertCircle,
  PENDING_RESPONSE: Clock,
  UNDER_REVIEW: AlertCircle,
  CLOSED: CheckCircle,
};

const CaseList: React.FC<CaseListProps> = ({ cases }) => {
  const navigate = useNavigate();

  if (cases.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Cases Found</h3>
        <p className="text-gray-500">
          There are no disciplinary cases to display. Create a new case to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Case Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cases.map((case_) => {
              const StatusIcon = statusIcons[case_.status];
              return (
                <tr
                  key={case_.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/cases/${case_.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {case_.title}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-md">
                      {case_.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {case_.employeeName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {case_.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[case_.status]
                      }`}
                    >
                      <StatusIcon className="w-4 h-4 mr-1" />
                      {case_.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(case_.incidentDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <ChevronRight className="w-5 h-5 text-blue-600" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaseList;