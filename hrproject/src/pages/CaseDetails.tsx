import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, Clock, MessageSquare, Paperclip } from 'lucide-react';
import CaseTimeline from '../components/cases/CaseTimeline';
import CaseResponse from '../components/cases/CaseResponse';
import CaseStatusUpdate from '../components/cases/CaseStatusUpdate';
import { DisciplinaryCase } from '../types';

const CaseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'details' | 'response' | 'timeline'>('details');

  // Mock data - Replace with actual data fetching
  const case_: DisciplinaryCase = {
    id: '1',
    title: 'Attendance Policy Violation',
    employeeName: 'John Smith',
    category: 'ATTENDANCE',
    description: 'Multiple instances of tardiness in the past month',
    status: 'OPEN',
    incidentDate: '2024-03-10',
    createdAt: '2024-03-11T10:00:00Z',
    updatedAt: '2024-03-11T10:00:00Z',
  };

  const tabs = [
    { id: 'details', label: 'Case Details', icon: FileText },
    { id: 'response', label: 'Response', icon: MessageSquare },
    { id: 'timeline', label: 'Timeline', icon: Clock },
  ] as const;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{case_.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>Case ID: {case_.id}</span>
          <span>•</span>
          <span>Created on {new Date(case_.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Employee</h3>
                  <p className="mt-1 text-sm text-gray-900">{case_.employeeName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Category</h3>
                  <p className="mt-1 text-sm text-gray-900">{case_.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Incident Date</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(case_.incidentDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <CaseStatusUpdate case_={case_} />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1 text-sm text-gray-900">{case_.description}</p>
              </div>

              {case_.attachments && case_.attachments.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Attachments
                  </h3>
                  <ul className="space-y-2">
                    {case_.attachments.map((file, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <Paperclip className="w-4 h-4" />
                        <span>{file.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'response' && <CaseResponse case_={case_} />}
          {activeTab === 'timeline' && <CaseTimeline case_={case_} />}
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;