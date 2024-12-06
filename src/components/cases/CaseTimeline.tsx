import React, { useEffect, useState } from "react";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  FileText,
  History,
  User,
  Loader,
  LucideIcon,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { AppDispatch } from "../../store";
import {
  fetchCaseTimeline,
  clearTimeline,
} from "../../redux/app/timline/timeline";

interface DisciplinaryCase {
  _id: string;
}

interface TimelineEvent {
  _id: string;
  event: string;
  description: string;
  createdAt: string | Date;
}

interface TimelineEventProps {
  event: TimelineEvent;
  isLast: boolean;
}

interface ErrorMessageProps {
  message: string;
}

const getEventIcon = (eventType: string | undefined): React.ReactNode => {
  switch (eventType?.toLowerCase()) {
    case "case created":
      return <FileText className="h-5 w-5 text-white" />;
    case "case updated":
      return <History className="h-5 w-5 text-white" />;
    case "status changed":
      return <Clock className="h-5 w-5 text-white" />;
    case "assigned":
      return <User className="h-5 w-5 text-white" />;
    case "completed":
      return <CheckCircle className="h-5 w-5 text-white" />;
    default:
      return <AlertCircle className="h-5 w-5 text-white" />;
  }
};

const getEventColor = (eventType: string | undefined): string => {
  switch (eventType?.toLowerCase()) {
    case "case created":
      return "bg-gradient-to-br from-blue-500 to-blue-600";
    case "case updated":
      return "bg-gradient-to-br from-purple-500 to-purple-600";
    case "status changed":
      return "bg-gradient-to-br from-amber-500 to-amber-600";
    case "assigned":
      return "bg-gradient-to-br from-indigo-500 to-indigo-600";
    case "completed":
      return "bg-gradient-to-br from-green-500 to-green-600";
    default:
      return "bg-gradient-to-br from-gray-500 to-gray-600";
  }
};

const TimelineEvent: React.FC<TimelineEventProps> = ({ event, isLast }) => (
  <li className="transform transition-all duration-300 ease-in-out hover:scale-[1.01]">
    <div className="relative pb-8">
      {!isLast && (
        <span
          className="absolute top-10 left-5 -ml-px h-full w-0.5 bg-gradient-to-b from-gray-300 via-gray-200 to-gray-100"
          aria-hidden="true"
        />
      )}
      <div className="relative flex space-x-4">
        <div className="flex mt-5 relative">
          <span
            className={`h-10 w-10 flex items-center justify-center rounded-full ring-8 ring-white shadow-lg ${getEventColor(
              event.event
            )}`}
          >
            {getEventIcon(event.event)}
          </span>
        </div>
        <div className="flex-1 min-w-0 py-0">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-semibold text-gray-900">
                  {event.event}
                </h4>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {event.createdAt
                    ? new Date(event.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : ""}
                </span>
              </div>
              <time className="text-xs font-medium text-gray-500">
                {event.createdAt
                  ? new Date(event.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Date not available"}
              </time>
            </div>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  </li>
);

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="rounded-xl bg-red-50 p-6 my-4 border border-red-100 shadow-sm">
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <AlertCircle className="h-6 w-6 text-red-400" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-red-800">
          Error loading timeline: {message}
        </p>
      </div>
    </div>
  </div>
);

const EmptyState: React.FC = () => (
  <div className="rounded-xl bg-gray-50 p-8 my-4 border border-gray-100 shadow-sm text-center">
    <AlertCircle className="h-10 w-10 text-gray-400 mx-auto mb-4" />
    <p className="text-sm font-medium text-gray-700 mb-1">
      No timeline events available
    </p>
    <p className="text-xs text-gray-500">
      Events will appear here once they are added to the case.
    </p>
  </div>
);

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center p-8">
    <Loader className="h-10 w-10 animate-spin text-gray-500" />
    <p className="mt-3 text-sm font-medium text-gray-600">
      Loading timeline...
    </p>
  </div>
);

const CaseTimeline: React.FC<any> = ({ case_ }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const timelines = useSelector((state: RootState) => state.timline.items);
  const [timeline, setTimeline] = useState(timelines);
  useEffect(() => {
    const fetchData = async () => {
      if (case_?._id) {
        setIsLoading(true);
        setError(null);
        const response = await dispatch(fetchCaseTimeline(case_?._id));
        if (response.meta.requestStatus === "fulfilled") {
          setTimeline(response.payload);
        }
        dispatch(fetchCaseTimeline(case_?._id))
          .unwrap()
          .catch((err: Error) => setError(err?.message))
          .finally(() => setIsLoading(false));
      }
    };

    fetchData();

    return () => {
      dispatch(clearTimeline());
    };
  }, [dispatch, case_?._id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!timeline?.length) {
    return <EmptyState />;
  }

  return (
    <div className="flow-root bg-gray-50 rounded-xl shadow-md p-8 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-8">
        Case Timeline
      </h3>
      <ul className="-mb-8">
        {timeline?.map((event, idx) => (
          <TimelineEvent
            key={event._id || idx}
            event={event}
            isLast={idx === timeline?.length - 1}
          />
        ))}
      </ul>
    </div>
  );
};

export default CaseTimeline;
