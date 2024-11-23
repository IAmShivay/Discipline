import React from 'react';
import {
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  FileText,
} from 'lucide-react';
import type { DisciplinaryCase } from '../../types';

interface CaseTimelineProps {
  case_: DisciplinaryCase;
}

const CaseTimeline: React.FC<CaseTimelineProps> = ({ case_ }) => {
  // Mock timeline data - Replace with actual data
  const timeline = [
    {
      id: 1,
      type: 'created',
      title: 'Case Created',
      description: 'Case was created and assigned',
      date: case_.createdAt,
      icon: FileText,
    },
    {
      id: 2,
      type: 'status',
      title: 'Status Updated',
      description: 'Case status changed to Open',
      date: case_.updatedAt,
      icon: Clock,
    },
  ];

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {timeline.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== timeline.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                      event.type === 'created'
                        ? 'bg-blue-500'
                        : event.type === 'status'
                        ? 'bg-gray-500'
                        : 'bg-green-500'
                    }`}
                  >
                    <event.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      {event.description}{' '}
                      <span className="font-medium text-gray-900">
                        {event.title}
                      </span>
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    {event.date ? new Date(event.date).toLocaleString() : 'Date not available'}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaseTimeline;