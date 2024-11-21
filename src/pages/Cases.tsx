import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import CaseList from '../components/cases/CaseList';
import CaseForm from '../components/cases/CaseForm';
import { DisciplinaryCase } from '../types';

const Cases: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [cases, setCases] = useState<DisciplinaryCase[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: '',
    dateRange: '',
  });

  const handleAddCase = (newCase: DisciplinaryCase) => {
    setCases((prev) => [...prev, newCase]);
    setShowForm(false);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Disciplinary Cases</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Case
        </button>
      </div>

      {showForm ? (
        <CaseForm onSubmit={handleAddCase} onCancel={() => setShowForm(false)} />
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  name="search"
                  placeholder="Search cases..."
                  value={filters.search}
                  onChange={handleFilterChange}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="DRAFT">Draft</option>
                <option value="OPEN">Open</option>
                <option value="PENDING_RESPONSE">Pending Response</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="CLOSED">Closed</option>
              </select>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option value="ATTENDANCE">Attendance</option>
                <option value="MISCONDUCT">Misconduct</option>
                <option value="POLICY_VIOLATION">Policy Violation</option>
                <option value="PERFORMANCE">Performance</option>
              </select>
              <input
                type="date"
                name="dateRange"
                value={filters.dateRange}
                onChange={handleFilterChange}
                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <button className="btn btn-secondary flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Apply Filters
              </button>
            </div>
          </div>

          <CaseList cases={cases} />
        </>
      )}
    </div>
  );
};

export default Cases;