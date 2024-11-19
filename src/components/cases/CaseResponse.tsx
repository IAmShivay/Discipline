import React, { useState } from 'react';
import { Send } from 'lucide-react';
import type { DisciplinaryCase } from '../../types';

interface CaseResponseProps {
  case_: DisciplinaryCase;
}

const CaseResponse: React.FC<CaseResponseProps> = ({ case_ }) => {
  const [response, setResponse] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle response submission
    console.log('Response submitted:', { response, attachments });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Please provide your response to this case. Include any relevant details
              or justification.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="response"
            className="block text-sm font-medium text-gray-700"
          >
            Your Response
          </label>
          <textarea
            id="response"
            rows={6}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your response here..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Supporting Documents (Optional)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload files</span>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PDF, DOC, DOCX, or image files up to 10MB each
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit Response
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaseResponse;