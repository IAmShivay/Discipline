import React, { useState } from 'react';
import { Mail, Edit2, Trash2 } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  description: string;
}

const mockTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'New Case Notification',
    subject: 'New Disciplinary Case: [Case Title]',
    description: 'Sent when a new case is created',
  },
  {
    id: '2',
    name: 'Response Request',
    subject: 'Action Required: Response Needed for Case [Case ID]',
    description: 'Sent when requesting employee response',
  },
];

const EmailTemplates = () => {
  const [templates] = useState<EmailTemplate[]>(mockTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Email Templates
        </h2>
        <p className="text-sm text-gray-500">
          Manage email notification templates
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 bg-gray-50 p-4 rounded-lg">
          <div className="space-y-2">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`w-full text-left p-3 rounded-lg ${
                  selectedTemplate === template.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-white border border-gray-200 hover:border-blue-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {template.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {template.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-2">
          {selectedTemplate ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Edit Template
                  </h3>
                  <p className="text-sm text-gray-500">
                    Customize the email template content
                  </p>
                </div>
                <div className="space-x-2">
                  <button className="btn btn-secondary">
                    Preview
                  </button>
                  <button className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Template Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    defaultValue={
                      templates.find((t) => t.id === selectedTemplate)?.name
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    defaultValue={
                      templates.find((t) => t.id === selectedTemplate)?.subject
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Content
                  </label>
                  <textarea
                    rows={10}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter email content..."
                  ></textarea>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Available Variables
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['[Employee_Name]', '[Case_Title]', '[Case_ID]', '[Due_Date]'].map(
                      (variable) => (
                        <span
                          key={variable}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {variable}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a Template
              </h3>
              <p className="text-gray-500">
                Choose a template from the list to edit its content
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailTemplates;