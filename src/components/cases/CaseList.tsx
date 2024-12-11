// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { AlertCircle, CheckCircle, Clock, Edit, Trash2 } from "lucide-react";
// import type { DisciplinaryCase } from "../../types";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../store";
// interface CaseListProps {
//   cases: DisciplinaryCase[];
// }

// const statusColors = {
//   DRAFT: "bg-gray-100 text-gray-800",
//   OPEN: "bg-blue-100 text-blue-800",
//   PENDING_RESPONSE: "bg-yellow-100 text-yellow-800",
//   UNDER_REVIEW: "bg-purple-100 text-purple-800",
//   CLOSED: "bg-green-100 text-green-800",
// };

// const statusIcons = {
//   DRAFT: Clock,
//   OPEN: AlertCircle,
//   PENDING_RESPONSE: Clock,
//   UNDER_REVIEW: AlertCircle,
//   CLOSED: CheckCircle,
// };

// interface CaseListProps {
//   cases: DisciplinaryCase[];
//   onEdit: (caseToEdit: DisciplinaryCase) => void;
//   onDelete: (caseId: string) => void;
// }
// const CaseList: React.FC<CaseListProps> = ({ cases, onEdit, onDelete }) => {
//   console.log(cases);

//   const navigate = useNavigate();
//   const { isAuthenticated, user } = useSelector(
//     (state: RootState) => state.verify
//   );

//   if (!cases || cases.length === 0) {
//     return (
//       <div className="bg-white rounded-lg shadow-md p-8 text-center">
//         <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//         <h3 className="text-lg font-medium text-gray-900 mb-2">
//           No Cases Found
//         </h3>
//         <p className="text-gray-500">
//           There are no disciplinary cases to display. Create a new case to get
//           started.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Case Details
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Employee
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Category
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {cases?.map((case_) => {
//               const StatusIcon =
//                 statusIcons[case_?.status as keyof typeof statusIcons] ||
//                 AlertCircle;
//               return (
//                 <tr
//                   key={case_?._id}
//                   className="hover:bg-gray-50 cursor-pointer"
//                 >
//                   <td
//                     className="px-6 py-4 whitespace-nowrap"
//                     onClick={() => navigate(`/cases/${case_?._id}`)}
//                   >
//                     <div className="flex items-center">
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">
//                           {case_?.title}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {case_?.description}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td
//                     className="px-6 py-4 whitespace-nowrap"
//                     onClick={() => navigate(`/cases/${case_?.id}`)}
//                   >
//                     <div className="text-sm text-gray-900">
//                       {case_?.employeeName}
//                     </div>
//                   </td>
//                   <td
//                     className="px-6 py-4 whitespace-nowrap"
//                     onClick={() => navigate(`/cases/${case_?.id}`)}
//                   >
//                     <div className="text-sm text-gray-900">{case_?.type}</div>
//                   </td>
//                   <td
//                     className="px-6 py-4 whitespace-nowrap"
//                     onClick={() => navigate(`/cases/${case_?.id}`)}
//                   >
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         statusColors[
//                           case_.status as keyof typeof statusColors
//                         ] || "bg-gray-100 text-gray-800"
//                       }`}
//                     >
//                       <StatusIcon className="w-4 h-4 mr-1" />
//                       {case_.status}
//                     </span>
//                   </td>
//                   <td
//                     className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
//                     onClick={() => navigate(`/cases/${case_.id}`)}
//                   >
//                     {case_.incidentDate &&
//                       new Date(case_.incidentDate).toLocaleDateString()}
//                   </td>
//                   {isAuthenticated &&
//                     (user?.role === "Company" ||
//                       user?.role === "Super Admin" ||
//                       user?.role === "Hr Manager" ||
//                       user?.role === "Editor") && (
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             onEdit(case_);
//                           }}
//                           className="text-indigo-600 hover:text-indigo-900 mr-2"
//                         >
//                           <Edit className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             const caseId = case_._id;
//                             if (caseId) {
//                               onDelete(caseId);
//                             } else {
//                             }
//                           }}
//                           className="text-red-600 hover:text-red-900"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </td>
//                     )}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CaseList;

import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle, Clock, Edit, Trash2 } from "lucide-react";
import type { DisciplinaryCase } from "../../types";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import MinimalistHRLoader from "../../pages/Loading";
import { LoadingSpinner } from "./CaseTimeline";

interface CaseListProps {
  cases: DisciplinaryCase[];
  onEdit: (caseToEdit: DisciplinaryCase) => void;
  onDelete: (caseId: string) => void;
  isLoading?: boolean;
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
const CaseList: React.FC<CaseListProps> = ({
  cases,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.verify
  );
  console.log(user?.role)

  const handleCaseNavigation = (caseId: string) => {
    if (!caseId && caseId?.length === 0) {
      <LoadingSpinner />;
    }
    navigate(`/cases/${caseId}`);
  };

  if (isLoading && cases.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-spin" />
        <p className="text-gray-500">Loading cases...</p>
      </div>
    );
  }

  if (!cases || cases.length === 0) {
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
              {[
                "Case Details",
                "Employee",
                "Category",
                "Status",
                "Date",
                ...(user?.role !== "employee" || "HR Manager"? ["Actions"] : []), // Conditionally add "Actions"
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cases.map((case_) => {
              const caseId = case_?._id || case_?.id;
              if (!caseId) return null; // Skip cases without an ID

              const StatusIcon =
                statusIcons[case_?.status as keyof typeof statusIcons] ||
                AlertCircle;

              return (
                <tr key={caseId} className="hover:bg-gray-50 cursor-pointer">
                  {[
                    {
                      content: (
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {case_?.title || "Untitled Case"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {case_?.description || "No description"}
                            </div>
                          </div>
                        </div>
                      ),
                    },
                    {
                      content: (
                        <div className="text-sm text-gray-900">
                          {case_?.employeeName || "Unknown Employee"}
                        </div>
                      ),
                    },
                    {
                      content: (
                        <div className="text-sm text-gray-900">
                          {case_?.type || "Unspecified"}
                        </div>
                      ),
                    },
                    {
                      content: (
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            statusColors[
                              case_.status as keyof typeof statusColors
                            ] || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <StatusIcon className="w-4 h-4 mr-1" />
                          {case_.status || "Unknown Status"}
                        </span>
                      ),
                    },
                    {
                      content: case_.incidentDate
                        ? new Date(case_.incidentDate).toLocaleDateString()
                        : "No Date",
                    },
                    {
                      content:
                        isAuthenticated &&
                        [
                          "Company",
                          "Super Admin",
                          "Hr Manager",
                          "Editor",
                        ].includes(user?.role || "") ? (
                          <div className="text-right">
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
                                onDelete(caseId);
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : null,
                    },
                  ].map((cell, index) => (
                    <td
                      key={index}
                      className="px-6 py-4 whitespace-nowrap"
                      onClick={() => handleCaseNavigation(caseId)}
                    >
                      {cell.content}
                    </td>
                  ))}
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
