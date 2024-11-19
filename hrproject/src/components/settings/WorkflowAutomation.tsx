import React from 'react';
import { ArrowRight, Plus } from 'lucide-react';

const WorkflowAutomation = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Workflow Automation
        </h2>
        <p className="text-sm text-gray-500">
          Configure case workflow and automation rules
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Case Status Flow
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="bg-white px-4 py-2 rounded shadow text-sm">
                Draft
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <div className="bg-white px-4 py-2 rounded shadow text-sm">
                Open
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <div className="bg-white px-4 py-2 rounded shadow text-sm">
                Under Review
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <div className="bg-white px-4 py-2 rounded shadow text-sm">
                Closed
              </div>
            </div>
            <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <Plus className="w-4 h-4" />
              Add Status
            </button>
          </div>
        </section>

        <section className="pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Auto-Closure Rules
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Auto-close cases after inactivity
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>Never</option>
                <option>After 30 days</option>
                <option>After 60 days</option>
                <option>After 90 days</option>
              </select>
            </div>
          </div>
        </section>

        <section className="pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Strike Rules
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Record strike on response rejection
                </p>
                <p className="text-sm text-gray-500">
                  Automatically record a strike when an employee's response is rejected
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum strikes before escalation
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>3 strikes</option>
                <option>5 strikes</option>
                <option>Custom</option>
              </select>
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

export default WorkflowAutomation;