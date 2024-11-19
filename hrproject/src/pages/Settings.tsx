import React, { useState } from 'react';
import {
  Users,
  Tags,
  Bell,
  GitBranch,
  Mail,
  Shield,
  Link,
  Settings as SettingsIcon,
} from 'lucide-react';
import UserManagement from '../components/settings/UserManagement';
import CategoriesAndTags from '../components/settings/CategoriesAndTags';
import NotificationSettings from '../components/settings/NotificationSettings';
import WorkflowAutomation from '../components/settings/WorkflowAutomation';
import EmailTemplates from '../components/settings/EmailTemplates';
import DataPrivacy from '../components/settings/DataPrivacy';
import IntegrationSettings from '../components/settings/IntegrationSettings';
import GeneralSettings from '../components/settings/GeneralSettings';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('user-management');

  const tabs = [
    { id: 'user-management', label: 'User Management', icon: Users },
    { id: 'categories-tags', label: 'Categories & Tags', icon: Tags },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'workflow', label: 'Workflow', icon: GitBranch },
    { id: 'email-templates', label: 'Email Templates', icon: Mail },
    { id: 'data-privacy', label: 'Data & Privacy', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Link },
    { id: 'general', label: 'General', icon: SettingsIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'user-management':
        return <UserManagement />;
      case 'categories-tags':
        return <CategoriesAndTags />;
      case 'notifications':
        return <NotificationSettings />;
      case 'workflow':
        return <WorkflowAutomation />;
      case 'email-templates':
        return <EmailTemplates />;
      case 'data-privacy':
        return <DataPrivacy />;
      case 'integrations':
        return <IntegrationSettings />;
      case 'general':
        return <GeneralSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your system preferences and configurations</p>
      </div>

      <div className="flex gap-6">
        <div className="w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;