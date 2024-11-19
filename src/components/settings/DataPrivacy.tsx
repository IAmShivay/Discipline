import React from 'react';
import { Shield, Clock, List } from 'lucide-react';

const DataPrivacy = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Data & Privacy Settings
        </h2>
        <p className="text-sm text-gray-500">
          Manage data access, retention, and audit logs
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Access Control
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Employee Self-Service Access
                </p>
                <p className="text-sm text-gray-500">
                  Allow employees to view their own cases
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Manager Access Level
                </p>
                <p className="text-sm text-gray-500">
                  Control what information managers can access
                </p>
              </div>
              <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>Full Access</option>
                <option>Limited Access</option>
                <option>View Only</option>
              </select>
            </div>
          </div>
        </section>

        <section className="pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Data Retention
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Case Retention Period
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>1 year</option>
                <option>3 years</option>
                <option>5 years</option>
                <option>7 years</option>
                <option>Indefinitely</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Auto-Archive Old Cases
                </p>
                <p className="text-sm text-gray-500">
                  Automatically archive cases after retention period
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </section>

        <section className="pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Audit Logs
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <List className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    View Audit Logs
                  </span>
                </div>
                <button className="btn btn-secondary">View Logs</button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Log Retention Period
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>30 days</option>
                  <option>60 days</option>
                  <option>90 days</option>
                  <option>180 days</option>
                  <option>1 year</option>
                </select>
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

export default DataPrivacy;