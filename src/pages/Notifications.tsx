import React, { useState, useEffect } from "react";
import { CheckCircle2, Filter, Search } from "lucide-react";
import NotificationList from "../components/notifications/NotificationList";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import type { Notification } from "../types";
import { fetchNotifications } from "../redux/app/notification/notificationSlice";
import { showSnackbar } from "../redux/app/error/errorSlice";
import { updateNotificationStatus } from "../redux/app/notification/notificationSlice";
const Notifications: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const caseNotifications = useSelector(
    (state: RootState) => state.notificationReducer.notifications
  ) as Notification[];

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    readStatus: "",
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification._id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
    dispatch(updateNotificationStatus(notificationId));
  };

  const filteredNotifications = notifications?.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      notification.message.toLowerCase().includes(filters.search.toLowerCase());

    const matchesType = filters.type
      ? notification.type === filters.type
      : true;

    const matchesReadStatus = filters.readStatus
      ? (filters.readStatus === "read") === notification.isRead
      : true;

    return matchesSearch && matchesType && matchesReadStatus;
  });

  const unreadCount = notifications?.filter((n) => !n.isRead)?.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchNotifications());
        setNotifications(caseNotifications);
      } catch (error) {
        dispatch(
          showSnackbar({
            message: "Error fetching notifications",
            severity: "error",
          })
        );
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-14">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {unreadCount} unread
            </span>
          )}
        </div>
        {/* <button
          onClick={handleMarkAllAsRead}
          className="btn btn-secondary flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          Mark all as read
        </button> */}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="search"
              placeholder="Search notifications..."
              value={filters.search}
              onChange={handleFilterChange}
              className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="CASE_CREATED">Case Created</option>
            <option value="CASE_UPDATED">Case Updated</option>
            <option value="CASE_CLOSED">Case Closed</option>
            <option value="EMPLOYEE_JOINED">Employee Joined</option>
            <option value="RESPONSE_SUBMITTED">Response Submitted</option>
            <option value="REMINDER">Reminder</option>
            <option value="STRIKE_RECORDED">Strike Recorded</option>
          </select>
          <select
            name="readStatus"
            value={filters.readStatus}
            onChange={handleFilterChange}
            className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
          <button className="btn btn-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Apply Filters
          </button>
        </div>
      </div>

      <NotificationList
        notifications={filteredNotifications}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
};

export default Notifications;
