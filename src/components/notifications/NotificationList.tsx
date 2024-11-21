import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  UserPlus,
  MessageSquare,
  Clock,
  XCircle,
} from 'lucide-react';
import type { Notification, NotificationType } from '../../types';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

const notificationIcons: Record<NotificationType, typeof Bell> = {
  CASE_CREATED: Bell,
  CASE_UPDATED: AlertCircle,
  CASE_CLOSED: CheckCircle2,
  EMPLOYEE_JOINED: UserPlus,
  RESPONSE_SUBMITTED: MessageSquare,
  REMINDER: Clock,
  STRIKE_RECORDED: XCircle,
};

const notificationColors: Record<NotificationType, string> = {
  CASE_CREATED: 'text-blue-500',
  CASE_UPDATED: 'text-yellow-500',
  CASE_CLOSED: 'text-green-500',
  EMPLOYEE_JOINED: 'text-purple-500',
  RESPONSE_SUBMITTED: 'text-indigo-500',
  REMINDER: 'text-orange-500',
  STRIKE_RECORDED: 'text-red-500',
};

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onMarkAsRead,
}) => {
  const navigate = useNavigate();

  if (notifications.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Notifications
        </h3>
        <p className="text-gray-500">
          You're all caught up! There are no notifications to display.
        </p>
      </div>
    );
  }

  const handleClick = (notification: Notification) => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    
    if (notification.caseId) {
      navigate(`/cases/${notification.caseId}`);
    } else if (notification.employeeId) {
      navigate(`/employees/${notification.employeeId}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
      {notifications.map((notification) => {
        const Icon = notificationIcons[notification.type];
        return (
          <div
            key={notification.id}
            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
              !notification.isRead ? 'bg-blue-50' : ''
            }`}
            onClick={() => handleClick(notification)}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`flex-shrink-0 ${
                  notificationColors[notification.type]
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p
                    className={`text-sm font-medium ${
                      !notification.isRead ? 'text-gray-900' : 'text-gray-600'
                    }`}
                  >
                    {notification.title}
                  </p>
                  <span className="text-sm text-gray-500">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {notification.message}
                </p>
              </div>
              {!notification.isRead && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsRead(notification.id);
                  }}
                  className="flex-shrink-0 ml-4"
                >
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                    Mark as read
                  </span>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationList;