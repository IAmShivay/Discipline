import React, { useState } from "react";
import { Send } from "lucide-react";
import type { DisciplinaryCase } from "../../types";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { addAdminResponse,addEmployeeResponse } from "../../redux/app/cases/caseSlice";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
interface Message {
  id: string;
  content: string;
  timestamp: Date;
  attachments?: File[];
}

interface CaseResponseProps {
  case_: DisciplinaryCase;
}

const CaseResponse: React.FC<CaseResponseProps> = ({ case_ }) => {
  console.log("case_", case_);
  const {user} = useSelector((state: RootState) => state.verify);
  const [response, setResponse] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (response.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: response,
        timestamp: new Date(),
        attachments,
      };
      if (user?.role === "admin" && case_._id) {
        dispatch(addAdminResponse({ caseId: case_._id, responseData: { message: newMessage.content, attachments: newMessage.attachments } }));
      } else if (user?.role === "employee" && case_._id) {
        dispatch(addEmployeeResponse({ caseId: case_._id, responseData: { message: newMessage.content, attachments: newMessage.attachments } }));
      }
      setResponse("");
      setAttachments([]);
    }
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
              Please provide your response to this case. Include any relevant
              details or justification.
            </p>
          </div>
        </div>
      </div>

      {/* Previous Messages Display */}
      {/* <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="border rounded-md p-4 bg-blue-50">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Your Response
              </span>
              <span className="text-sm text-gray-500">
                {message.timestamp.toLocaleString()}
              </span>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap">
              {message.content}
            </p>
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                <p className="font-medium">Attachments:</p>
                <ul className="list-disc pl-5">
                  {message.attachments.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div> */}

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
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Send className="w-4 h-4 mr-2" />
            Submit Response
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaseResponse;
