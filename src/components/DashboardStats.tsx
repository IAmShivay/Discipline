// import React from 'react';
// import { AlertCircle, CheckCircle2, Clock, Files } from 'lucide-react';
// import type { DashboardStats } from '../types';

// interface StatsCardProps {
//   title: string;
//   value: number;
//   icon: React.ReactNode;
//   color: string;
// }

// const StatsCard = ({ title, value, icon, color }: StatsCardProps) => (
//   <div className="bg-white rounded-lg p-6 shadow-md">
//     <div className="flex items-center justify-between">
//       <div>
//         <p className="text-gray-500 text-sm">{title}</p>
//         <p className="text-2xl font-bold mt-1">{value}</p>
//       </div>
//       <div className={`${color} p-3 rounded-full`}>
//         {icon}
//       </div>
//     </div>
//   </div>
// );

// const DashboardStats = ({ stats }: { stats: DashboardStats }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       <StatsCard
//         title="Total Cases"
//         value={stats.totalCases}
//         icon={<Files className="w-6 h-6 text-blue-600" />}
//         color="bg-blue-100"
//       />
//       <StatsCard
//         title="Open Cases"
//         value={stats.openCases}
//         icon={<Clock className="w-6 h-6 text-yellow-600" />}
//         color="bg-yellow-100"
//       />
//       <StatsCard
//         title="Closed Cases"
//         value={stats.closedCases}
//         icon={<CheckCircle2 className="w-6 h-6 text-green-600" />}
//         color="bg-green-100"
//       />
//       <StatsCard
//         title="Pending Actions"
//         value={stats.pendingActions}
//         icon={<AlertCircle className="w-6 h-6 text-red-600" />}
//         color="bg-red-100"
//       />
//     </div>
//   );
// };

// export default DashboardStats;

import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Files,
  Bell,
  User,
  ChevronDown,
  LogOut,
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
  username,
  unreadNotifications,
}: {
  username: string;
  unreadNotifications: number;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const error = useSelector((state: RootState) => state.auth.error);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
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
        <div className="relative">
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
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center focus:outline-none"
          >
            <div className="bg-gray-200 rounded-full p-2">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <ChevronDown className="w-4 h-4 ml-1 text-gray-600" />
          </button>
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-10">
              <div
                className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                onClick={() => {
                  // Handle profile click
                  setIsProfileMenuOpen(false);
                  navigate("/settings");
                }}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                onClick={() => {
                  // Handle logout
                  setIsProfileMenuOpen(false);
                  handleLogout();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
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
      <Header username={user?.fullName || "User"} unreadNotifications={count} />
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
