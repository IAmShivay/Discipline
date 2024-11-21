import React from 'react';
import { Link2, Calendar, Database } from 'lucide-react';

const IntegrationSettings = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Integration Settings
        </h2>
        <p className="text-sm text-gray-500">
          Configure external system integrations
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            HR System Integration
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      HR System Sync
                    </p>
                    <p className="text-sm text-gray-500">
                      Sync employee data with external HR system
                    </p>
                  </div>
                </div>
                <button className="btn btn-primary">Configure</button>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    HR System URL
                  </label>
                  <input
                    type="url"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="https://"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    API Key
                  </label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sync Frequency
                  </label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>Every hour</option>
                    <option>Every 6 hours</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Calendar Integration
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Calendar Sync
                    </p>
                    <p className="text-sm text-gray-500">
                      Connect with Google Calendar or Outlook
                    </p>
                  </div>
                </div>
                <div className="space-x-2">
                  <button className="btn btn-secondary">
                    Google Calendar
                  </button>
                  <button className="btn btn-secondary">
                    Outlook
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Sync Calendar Events
                    </p>
                    <p className="text-sm text-gray-500">
                      Add case deadlines to calendar
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="pt-6 border-t border-gray-200">
          <button className="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSettings;