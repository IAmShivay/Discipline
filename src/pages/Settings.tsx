import React, { useState, useEffect } from "react";
import {
  Users,
  Tags,
  Settings as SettingsIcon,
} from "lucide-react";
import UserManagement from "../components/settings/UserManagement";
import CategoriesAndTags from "../components/settings/CategoriesAndTags";
import NotificationSettings from "../components/settings/NotificationSettings";
import WorkflowAutomation from "../components/settings/WorkflowAutomation";
import EmailTemplates from "../components/settings/EmailTemplates";
import DataPrivacy from "../components/settings/DataPrivacy";
import IntegrationSettings from "../components/settings/IntegrationSettings";
import GeneralSettings from "../components/settings/GeneralSettings";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate, useSearchParams } from "react-router-dom";

const Settings = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.verify
  );

  // Use search param for initial tab, default to 'general'
  const [activeTab, setActiveTab] = useState(
    searchParams.get('tab') || 'general'
  );

  // Update URL when tab changes
  useEffect(() => {
    // Replace the current search params with the new tab
    navigate(`?tab=${activeTab}`, { replace: true });
  }, [activeTab, navigate]);

  const tabs = [
    ...(user?.role === "Company" || user?.role === "Super Admin"
      ? [{ id: "user-management", label: "User Management", icon: Users }]
      : []),
    { id: "categories-tags", label: "Categories & Tags", icon: Tags },
    { id: "general", label: "General", icon: SettingsIcon },
  ];

  const getFilteredMenuItems = (role: string) => {
    if (role === "employee") {
      return tabs?.filter((item) => item.label === "General");
    }
    return tabs;
  };

  const renderContent = () => {
    switch (activeTab) {
      case "user-management":
        return <UserManagement />;
      case "categories-tags":
        return <CategoriesAndTags />;
      case "notifications":
        return <NotificationSettings />;
      case "workflow":
        return <WorkflowAutomation />;
      case "email-templates":
        return <EmailTemplates />;
      case "data-privacy":
        return <DataPrivacy />;
      case "integrations":
        return <IntegrationSettings />;
      case "general":
        return <GeneralSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mt-14">
          Settings
        </h1>
        <p className="text-sm lg:text-base text-gray-500">
          Manage your system preferences and configurations
        </p>
      </div>

      {/* Large Screen Layout */}
      <div className="hidden lg:flex gap-6">
        <div className="w-64 flex-shrink-0">
          <nav className="space-y-1">
            {getFilteredMenuItems(user?.role || "")?.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">{renderContent()}</div>
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden">
        {/* Scrollable Tabs */}
        <div className="mb-4 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 min-w-max pb-3">
            {getFilteredMenuItems(user?.role || "")?.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap
                    ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;