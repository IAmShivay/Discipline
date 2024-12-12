import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Files,
  Bell,
  User,
  ChevronDown,
} from "lucide-react";
import type { DashboardStats } from "../types";

import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/app/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchNotifications } from "../redux/app/notification/notificationSlice";
import { RootState } from "../store";
import { showSnackbar } from "../redux/app/error/errorSlice";
import snackbarMessages from "./messages/message";
import { useRef } from "react";
import { Settings, LogOut } from "lucide-react";

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
      <div className={`${color} p-3 rounded-full`}>{icon}</div>
    </div>
  </div>
);

const Header = ({
  email,
  username,
  unreadNotifications,
}: {
  email: string;
  username: string;
  unreadNotifications: number;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const error = useSelector((state: RootState) => state.auth.error);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await dispatch(logoutUser());
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(
        showSnackbar({
          message: snackbarMessages.info.logoutMessage,
          severity: "info",
        })
      );
    } else if (error) {
      const { errors }: any = error;
      dispatch(
        showSnackbar({
          message: errors?.map((e: any) => e.message) || "An error occurred",
          severity: "error",
        })
      );
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {username}!
        </h1>
        <p className="text-gray-500 text-sm">Here's your dashboard overview</p>
      </div>
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <div className="relative" onClick={() => navigate("/notifications")}>
          <Bell className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />
          {unreadNotifications > 0 && (
            <span
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
              rounded-full w-5 h-5 flex items-center justify-center"
            >
              {unreadNotifications}
            </span>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg  transition-colors "
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {username?.charAt(0)}
              </span>
              <span className="text-sm font-medium text-white"></span>
            </div>
            <div className="flex-1 text-left hidden md:block">
              <p className="text-sm font-medium text-black">{username}</p>
              {/* <p className="text-sm font-medium text-white">{email}</p> */}

            </div>
            <ChevronDown className="w-4 h-4 text-black" />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute top-full right-0 mb-2 w-72 bg-white rounded-lg shadow-lg py-2 z-10">
              <div className="px-4 py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-lg font-medium text-white">
                      {username?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {username}
                    </p>
                    <p className="text-sm font-medium text-gray-900">{email}</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 mt-2">
                <button
                  onClick={() => {
                    navigate("/settings");
                    setIsProfileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Edit Profile
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  onClick={() => {
                    handleLogout();
                    setIsProfileMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardStats = ({ stats }: { stats: DashboardStats }) => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.verify);
  const notifications = useSelector(
    (state: RootState) => state.notificationReducer.notifications
  );
  console.log(notifications);
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);
  const count = notifications.filter((n) => n.isRead === false).length;
  return (
    <div>
      <Header
        username={user?.fullName || "User"}
        unreadNotifications={count}
        email={user?.email || ""}
      />
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
    </div>
  );
};

export default DashboardStats;
