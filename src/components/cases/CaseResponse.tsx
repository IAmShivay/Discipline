import React, { useEffect, useState } from "react";
import { Send, UserCircle, Shield, Download, FileText, X } from "lucide-react";
import type { DisciplinaryCase } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store";
import {
  addAdminResponse,
  addEmployeeResponse,
  fetchCaseById,
} from "../../redux/app/cases/caseSlice";
import { RootState } from "../../store";
import { showSnackbar } from "../../redux/app/error/errorSlice";

interface Message {
  message: string;
  createdAt: Date;
  type: "Company" | "employee" | "Super Admin" | "HR Manager" | "admin";
  attachments?: any[];
}

interface CaseResponseProps {
  case_: DisciplinaryCase;
}

const CaseResponse: React.FC<CaseResponseProps> = ({ case_ }) => {
  const caseNow = useSelector((state: RootState) => state.cases.currentCase);
  const { user } = useSelector((state: RootState) => state.verify);
  const [response, setResponse] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [allResponses, setAllResponses] = useState<Message[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  // Initialize responses from Redux state
  useEffect(() => {
    if (caseNow) {
      const adminResponses = (caseNow.adminResponses || [])?.map((resp) => ({
        ...resp,
        type: "admin" as const,
      }));

      const employeeResponses = (caseNow.employeeResponse || [])?.map(
        (resp) => ({
          ...resp,
          type: "employee" as const,
        })
      );

      const sortedResponses = [...adminResponses, ...employeeResponses].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      setAllResponses(sortedResponses);
    }
  }, [caseNow]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (response.trim()) {
      const newMessage: Message = {
        message: response,
        createdAt: new Date(),
        type: user?.role === "Company" ? "Company" : "employee",
        attachments,
      };

      // Add to local state immediately
      setAllResponses((prev) => [...prev, newMessage]);

      // Dispatch to Redux
      if (case_._id) {
        if (
          user?.role === "Company" ||
          user?.role === "Super Admin" ||
          user?.role === "HR Manager"
        ) {
          const result = await dispatch(
            addAdminResponse({
              caseId: case_._id,
              responseData: {
                message: response,
                attachments,
              },
            })
          );
          if (result.meta.requestStatus === "fulfilled") {
            dispatch(
              showSnackbar({
                message: "Response added successfully",
                severity: "success",
              })
            );
          }
          if (result.meta.requestStatus === "rejected") {
            dispatch(
              showSnackbar({
                message: result.payload,
                severity: "error",
              })
            );
          }
        } else if (user?.role === "employee") {
          const result = await dispatch(
            addEmployeeResponse({
              caseId: case_._id,
              responseData: {
                message: response,
                attachments,
              },
            })
          );
          if (result.meta.requestStatus === "fulfilled") {
            dispatch(
              showSnackbar({
                message: "Response added successfully",
                severity: "success",
              })
            );
          }
          if (result.meta.requestStatus === "rejected") {
            dispatch(
              showSnackbar({
                message: result.payload,
                severity: "error",
              })
            );
          }
        }

        // Fetch updated case data
        dispatch(fetchCaseById(case_._id));
      }

      setResponse("");
      setAttachments([]);
    }
  };

  const handleFileChange = (e: any) => {
    if (e.target.files) {
      setAttachments((prev: any) => [...prev, ...Array.from(e.target.files)]);
    }
  };
  const handleDownload = (file: {
    name: string;
    url: string;
    createdAt: Date;
  }) => {
    const url = file.url;
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const removeFile = (indexToRemove: number) => {
    setAttachments((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleString();
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

      {/* Message Thread Display */}
      <div className="space-y-4 max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg">
        {/* Initial case description */}
        <div className="border rounded-md p-4 bg-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <UserCircle className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              Initial Case
            </span>
            <span className="text-sm text-gray-500">
              {case_.createdAt ? formatDate(case_.createdAt) : "N/A"}
            </span>
          </div>
          <p className="text-gray-800 whitespace-pre-wrap">
            {case_.description}
          </p>
        </div>

        {/* Display all responses */}
        {allResponses?.map((response, index) => (
          <div
            key={index}
            className={`border rounded-md p-4 ${
              response.type === "admin" ? "bg-blue-50 ml-4" : "bg-green-50 mr-4"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {response.type === "Company" ? (
                <Shield className="w-5 h-5 text-blue-600" />
              ) : (
                <UserCircle className="w-5 h-5 text-green-600" />
              )}
              <span className="text-sm font-medium text-gray-700">
                {response.type === "admin"
                  ? "Admin Response"
                  : "Employee Response"}
              </span>
              <span className="text-sm text-gray-500">
                {formatDate(response.createdAt)}
              </span>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap">
              {response.message}
            </p>
            {response.attachments && response.attachments?.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                <p className="font-medium">Attachments:</p>
                <ul className="list-none pl-5">
                  {response?.attachments?.map(
                    (
                      file: { name: string; url: string; createdAt: Date },
                      idx: number
                    ) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span>{file.name}</span>
                        <button
                          onClick={() => handleDownload(file)}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-800"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download 
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Response Form */}
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Supporting Documents (Optional)
            </label>
            <label
              htmlFor="file-upload"
              className="mt-1 block w-full px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-500 transition-colors"
            >
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="space-y-1 text-center">
                <div className="flex justify-center text-sm text-gray-600">
                  <span>Upload files or drag and drop</span>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX, or image files up to 10MB each
                </p>
                {attachments.length > 0 && (
                  <div className="mt-2 text-sm text-gray-700">
                    Selected files:{" "}
                    {attachments.map((file) => file.name).join(", ")}
                  </div>
                )}
              </div>
            </label>
          </div>
          {attachments.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Selected Files:
              </p>
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {file.type || "Unknown type"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div></div>

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
