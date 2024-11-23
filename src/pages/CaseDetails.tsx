import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FileText, Clock, MessageSquare, Download } from "lucide-react";
import CaseTimeline from "../components/cases/CaseTimeline";
import CaseResponse from "../components/cases/CaseResponse";
import CaseStatusUpdate from "../components/cases/CaseStatusUpdate";
import { DisciplinaryCase } from "../types";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchCaseById } from "../redux/app/cases/caseSlice";
const CaseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (id) {
      dispatch(fetchCaseById(id));
    }
  }, [dispatch, id]);

  const [activeTab, setActiveTab] = useState<
    "details" | "response" | "timeline"
  >("details");

  const case_: DisciplinaryCase | null = useSelector(
    (state: RootState) => state.cases.currentCase
  );
  const tabs = [
    { id: "details", label: "Case Details", icon: FileText },
    { id: "response", label: "Response", icon: MessageSquare },
    { id: "timeline", label: "Timeline", icon: Clock },
  ] as const;

  return (
    <div className="p-6">
      {case_ ? (
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{case_.title.toUpperCase()}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Case ID: {case_._id}</span>
            <span>•</span>
            <span>
              Created on{" "}
              {case_.createdAt
                ? new Date(case_.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "details" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Employee
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {case_?.employeeName}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Category
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">{case_?.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Incident Date
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {case_?.incidentDate
                      ? new Date(case_.incidentDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  {case_ && <CaseStatusUpdate case_={case_} />}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Description
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {case_?.description ?? "No description available"}
                </p>
              </div>

              {case_ && case_.attachments && case_.attachments.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Attachments
                  </h3>
                  <ul className="space-y-2">
                    {case_.attachments.map(
                      (file: { url: string; name: string }, index: number) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          {file.url.toLowerCase().endsWith(".pdf") ? (
                            <>
                              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 group max-w-xl">
                                {/* File Icon */}
                                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                  <FileText className="w-5 h-5 text-blue-600" />
                                </div>

                                {/* File Name */}
                                <a
                                  href={file.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-grow font-medium text-gray-700 hover:text-blue-600 transition-colors truncate"
                                >
                                  {file.name}
                                </a>

                                {/* Download Button */}
                                <div className="flex items-center gap-2">
                                  <a
                                    href={file.url}
                                    download={file.name}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium text-sm group-hover:shadow-sm"
                                    title="Download file"
                                  >
                                    <Download className="w-4 h-4" />
                                    <span>Download</span>
                                  </a>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <img
                                src={file.url}
                                alt={file.name}
                                className="w-10 h-10 object-cover rounded"
                              />
                              <a
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {file.name}
                              </a>
                            </>
                          )}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === "response" && case_ && <CaseResponse case_={case_} />}
          {activeTab === "timeline" && case_ && <CaseTimeline case_={case_} />}
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
