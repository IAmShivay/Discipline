import React from 'react';
import { Globe, Clock } from 'lucide-react';

const GeneralSettings = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          General Settings
        </h2>
        <p className="text-sm text-gray-500">
          Configure system-wide preferences
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Date & Time
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date Format
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time Format
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>12-hour (AM/PM)</option>
                <option>24-hour</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time Zone
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>UTC</option>
                <option>(GMT-05:00) Eastern Time</option>
                <option>(GMT-08:00) Pacific Time</option>
                <option>(GMT+00:00) London</option>
              </select>
            </div>
          </div>
        </section>

        <section className="pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Language & Localization
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                System Language
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </div>
        </section>

        <section className="pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Branding
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Logo
              </label>
              <div className="mt-1 flex items-center">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <button
                  type="button"
                  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Change
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Primary Color
              </label>
              <div className="mt-1">
                <input
                  type="color"
                  className="h-8 w-16 rounded border border-gray-300"
                  defaultValue="#3B82F6"
                />
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

export default GeneralSettings;