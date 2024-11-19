import React, { useState } from 'react';
import type { DisciplinaryCase, CaseStatus } from '../../types';

interface CaseStatusUpdateProps {
  case_: DisciplinaryCase;
}

const statusOptions: { value: CaseStatus; label: string }[] = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'OPEN', label: 'Open' },
  { value: 'PENDING_RESPONSE', label: 'Pending Response' },
  { value: 'UNDER_REVIEW', label: 'Under Review' },
  { value: 'CLOSED', label: 'Closed' },
];

const statusColors = {
  DRAFT: 'bg-gray-100 text-gray-800',
  OPEN: 'bg-blue-100 text-blue-800',
  PENDING_RESPONSE: 'bg-yellow-100 text-yellow-800',
  UNDER_REVIEW: 'bg-purple-100 text-purple-800',
  CLOSED: 'bg-green-100 text-green-800',
};

const CaseStatusUpdate: React.FC<CaseStatusUpdateProps> = ({ case_ }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState<CaseStatus>(case_.status);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as CaseStatus);
    setIsEditing(false);
    // Handle status update
  };

  if (isEditing) {
    return (
      <select
        value={status}
        onChange={handleStatusChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        autoFocus
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className={`mt-1 inline-flex items-center px-2.5 py-1.5 rounded-md text-sm font-medium ${
        statusColors[status]
      }`}
    >
      {status.replace('_', ' ')}
    </button>
  );
};

export default CaseStatusUpdate;