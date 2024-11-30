import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle, Clock, Edit, Trash2 } from "lucide-react";
import type { DisciplinaryCase } from "../../types";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
interface CaseListProps {
  cases: DisciplinaryCase[];
}

const statusColors = {
  DRAFT: "bg-gray-100 text-gray-800",
  OPEN: "bg-blue-100 text-blue-800",
  PENDING_RESPONSE: "bg-yellow-100 text-yellow-800",
  UNDER_REVIEW: "bg-purple-100 text-purple-800",
  CLOSED: "bg-green-100 text-green-800",
};

const statusIcons = {
  DRAFT: Clock,
  OPEN: AlertCircle,
  PENDING_RESPONSE: Clock,
  UNDER_REVIEW: AlertCircle,
  CLOSED: CheckCircle,
};

interface CaseListProps {
  cases: DisciplinaryCase[];
  onEdit: (caseToEdit: DisciplinaryCase) => void;
  onDelete: (caseId: string) => void;
}

const CaseList: React.FC<CaseListProps> = ({ cases, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.verify
  );

  if (cases?.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Cases Found
        </h3>
        <p className="text-gray-500">
          There are no disciplinary cases to display. Create a new case to get
          started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Case Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cases?.map((case_) => {
              const StatusIcon =
                statusIcons[case_.status as keyof typeof statusIcons] ||
                AlertCircle;
              return (
                <tr key={case_.id} className="hover:bg-gray-50 cursor-pointer">
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    onClick={() => navigate(`/cases/${case_._id}`)}
                  >
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {case_.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {case_.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    onClick={() => navigate(`/cases/${case_.id}`)}
                  >
                    <div className="text-sm text-gray-900">
                      {case_.employeeName}
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    onClick={() => navigate(`/cases/${case_.id}`)}
                  >
                    <div className="text-sm text-gray-900">{case_.type}</div>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    onClick={() => navigate(`/cases/${case_.id}`)}
                  >
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        statusColors[
                          case_.status as keyof typeof statusColors
                        ] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <StatusIcon className="w-4 h-4 mr-1" />
                      {case_.status}
                    </span>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    onClick={() => navigate(`/cases/${case_.id}`)}
                  >
                    {case_.incidentDate &&
                      new Date(case_.incidentDate).toLocaleDateString()}
                  </td>
                  {isAuthenticated &&
                    (user?.role === "admin" ||
                      user?.role === "superadmin" ||
                      user?.role === "manager" ||
                      user?.role === "hr") && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(case_);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 mr-2"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const caseId = case_._id;
                            if (caseId) {
                              onDelete(caseId);
                            } else {
                              // console.error("Case id is undefined", case_);
                            }
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaseList;
