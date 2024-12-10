// import React, { useState } from "react";
// import { Plus, Filter } from "lucide-react";
// import CaseList from "../components/cases/CaseList";
// import CaseForm from "../components/cases/CaseForm";
// import { DisciplinaryCase } from "../types";
// import { createCase } from "../redux/app/cases/caseSlice";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../store";
// import { fetchCases } from "../redux/app/cases/caseSlice";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { updateCase } from "../redux/app/cases/caseSlice";
// import { deleteCase } from "../redux/app/cases/caseSlice";
// import snackbarMessages from "../components/messages/message";
// import { showSnackbar } from "../redux/app/error/errorSlice";
// import MinimalistHRLoader from "./Loading";

// const Cases: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [showForm, setShowForm] = useState(false);
//   const casesState = useSelector(
//     (state: { cases: { cases: DisciplinaryCase[] } }) => state.cases.cases
//   );
//   const { error, loading } = useSelector(
//     (state: { cases: { error: string; loading: boolean } }) => state.cases
//   );
//   const [cases, setCases] = useState<DisciplinaryCase[]>(casesState);
//   const [editingCase, setEditingCase] = useState<DisciplinaryCase | null>(null);
//   const [filters, setFilters] = useState({
//     search: "",
//     status: "",
//     category: "",
//     dateRange: "",
//   });

//   const handleAddCase = async (newCase: DisciplinaryCase) => {
//     setCases((prev) => [...prev, newCase]);
//     setShowForm(false);
//     const response = await dispatch(createCase(newCase));
//     if (response.meta.requestStatus === "fulfilled") {
//       dispatch(
//         showSnackbar({
//           message: snackbarMessages.success.caseCreated,
//           severity: "info",
//         })
//       );
//     } else if (error) {
//       const { errors }: any = error;
//       dispatch(
//         showSnackbar({
//           message: errors?.map((e: any) => e.message) || "An error occurred",
//           severity: "error",
//         })
//       );
//     }
//   };

//   const handleEditCase = (caseToEdit: DisciplinaryCase) => {
//     setEditingCase(caseToEdit);
//     setShowForm(true);
//   };

//   const handleUpdateCase = async (updatedCase: DisciplinaryCase) => {
//     setCases((prev) =>
//       prev?.map((c) => (c._id === updatedCase._id ? updatedCase : c))
//     );
//     setEditingCase(null);
//     setShowForm(false);
//     if (updatedCase._id) {
//       const response = await dispatch(
//         updateCase({ id: updatedCase._id, caseData: updatedCase })
//       );
//       window.location.reload();
//       if (response.meta.requestStatus === "fulfilled") {
//         setCases(response.payload.data);
//         dispatch(
//           showSnackbar({
//             message: snackbarMessages.success.caseUpdated,
//             severity: "info",
//           })
//         );
//       }
//     } else {
//     }
//   };

//   const handleDeleteCase = async (caseId: string) => {
//     if (window.confirm("Are you sure you want to delete this case?")) {
//       setCases((prev) => prev?.filter((c) => c.id !== caseId));
//     }
//     const response = await dispatch(deleteCase(caseId));
//     if (response.meta.requestStatus === "fulfilled") {
//       dispatch(
//         showSnackbar({
//           message: snackbarMessages.success.caseDeleted,
//           severity: "info",
//         })
//       );
//     }
//   };

//   const handleFilterChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };
//   useEffect(() => {
//     try {
//       const fetchData = async () => {
//         const response = await dispatch(fetchCases());
//         console.log(response);
//         if (response.meta.requestStatus === "fulfilled") {
//           setCases(response.payload.data);
//         } else if (response.meta.requestStatus === "rejected") {
//           dispatch(
//             showSnackbar({
//               message: response.payload,
//               severity: "error",
//             })
//           );
//         }
//       };
//       fetchData();
//     } catch (error: any) {
//       dispatch(
//         showSnackbar({
//           message: error.message,
//           severity: "error",
//         })
//       );
//     }
//   }, [dispatch, updateCase, deleteCase]);

//   if (loading) {
//     return <MinimalistHRLoader />;
//   }
//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6 mt-14">
//         <h1 className="text-2xl font-bold">Disciplinary Cases</h1>
//         <button
//           onClick={() => setShowForm(true)}
//           className="btn btn-primary flex items-center gap-2"
//         >
//           <Plus className="w-4 h-4" />
//           Create Case
//         </button>
//       </div>

//       {showForm ? (
//         <CaseForm
//           onSubmit={editingCase ? handleUpdateCase : handleAddCase}
//           onCancel={() => {
//             setShowForm(false);
//             setEditingCase(null);
//           }}
//           initialData={editingCase}
//         />
//       ) : (
//         <>
//           {/* <div className="bg-white rounded-lg shadow-md p-4 mb-6">
//             <div className="flex items-center gap-4 flex-wrap">
//               <div className="flex-1 min-w-[200px]">
//                 <input
//                   type="text"
//                   name="search"
//                   placeholder="Search cases..."
//                   value={filters.search}
//                   onChange={handleFilterChange}
//                   className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                 />
//               </div>
//               <select
//                 name="status"
//                 value={filters.status}
//                 onChange={handleFilterChange}
//                 className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//               >
//                 <option value="">All Statuses</option>
//                 <option value="DRAFT">Draft</option>
//                 <option value="OPEN">Open</option>
//                 <option value="PENDING_RESPONSE">Pending Response</option>
//                 <option value="UNDER_REVIEW">Under Review</option>
//                 <option value="CLOSED">Closed</option>
//               </select>
//               <select
//                 name="category"
//                 value={filters.category}
//                 onChange={handleFilterChange}
//                 className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//               >
//                 <option value="">All Categories</option>
//                 <option value="ATTENDANCE">Attendance</option>
//                 <option value="MISCONDUCT">Misconduct</option>
//                 <option value="POLICY_VIOLATION">Policy Violation</option>
//                 <option value="PERFORMANCE">Performance</option>
//               </select>
//               <input
//                 type="date"
//                 name="dateRange"
//                 value={filters.dateRange}
//                 onChange={handleFilterChange}
//                 className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//               />
//               <button className="btn btn-secondary flex items-center gap-2">
//                 <Filter className="w-4 h-4" />
//                 Apply Filters
//               </button>
//             </div>
//           </div> */}

//           <CaseList
//             cases={casesState}
//             onEdit={handleEditCase}
//             onDelete={handleDeleteCase}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default Cases;


import React, { useState, useEffect } from "react";
import { Plus, Filter } from "lucide-react";
import CaseList from "../components/cases/CaseList";
import CaseForm from "../components/cases/CaseForm";
import { DisciplinaryCase } from "../types";
import { createCase } from "../redux/app/cases/caseSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { fetchCases } from "../redux/app/cases/caseSlice";
import { useSelector } from "react-redux";
import { updateCase } from "../redux/app/cases/caseSlice";
import { deleteCase } from "../redux/app/cases/caseSlice";
import snackbarMessages from "../components/messages/message";
import { showSnackbar } from "../redux/app/error/errorSlice";
import MinimalistHRLoader from "./Loading";

const Cases: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showForm, setShowForm] = useState(false);
  
  // Use optional chaining and provide a default empty array
  const casesState = useSelector(
    (state: { cases: { cases: DisciplinaryCase[] } }) => 
      state.cases?.cases || []
  );
  
  const { error, loading } = useSelector(
    (state: { cases: { error: string; loading: boolean } }) => state.cases
  );
  
  const [cases, setCases] = useState<DisciplinaryCase[]>([]);
  const [editingCase, setEditingCase] = useState<DisciplinaryCase | null>(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    category: "",
    dateRange: "",
  });

  // Ensure cases are set from casesState when it changes
  useEffect(() => {
    setCases(casesState);
  }, [casesState]);

  const handleAddCase = async (newCase: DisciplinaryCase) => {
    try {
      const response = await dispatch(createCase(newCase));
      if (response.meta.requestStatus === "fulfilled") {
        // Refresh cases after successful creation
        await dispatch(fetchCases());
        dispatch(
          showSnackbar({
            message: snackbarMessages.success.caseCreated,
            severity: "info",
          })
        );
        setShowForm(false);
      } else {
        const { errors }: any = error;
        dispatch(
          showSnackbar({
            message: errors?.map((e: any) => e.message) || "An error occurred",
            severity: "error",
          })
        );
      }
    } catch (err) {
      dispatch(
        showSnackbar({
          message: "Failed to add case",
          severity: "error",
        })
      );
    }
  };

  const handleEditCase = (caseToEdit: DisciplinaryCase) => {
    setEditingCase(caseToEdit);
    setShowForm(true);
  };

  const handleUpdateCase = async (updatedCase: DisciplinaryCase) => {
    try {
      if (updatedCase._id) {
        const response = await dispatch(
          updateCase({ id: updatedCase._id, caseData: updatedCase })
        );
        
        if (response.meta.requestStatus === "fulfilled") {
          // Refresh cases after successful update
          await dispatch(fetchCases());
          dispatch(
            showSnackbar({
              message: snackbarMessages.success.caseUpdated,
              severity: "info",
            })
          );
          setShowForm(false);
          setEditingCase(null);
        }
      }
    } catch (err) {
      dispatch(
        showSnackbar({
          message: "Failed to update case",
          severity: "error",
        })
      );
    }
  };

  const handleDeleteCase = async (caseId: string) => {
    try {
      if (window.confirm("Are you sure you want to delete this case?")) {
        const response = await dispatch(deleteCase(caseId));
        
        if (response.meta.requestStatus === "fulfilled") {
          // Refresh cases after successful deletion
          await dispatch(fetchCases());
          dispatch(
            showSnackbar({
              message: snackbarMessages.success.caseDeleted,
              severity: "info",
            })
          );
        }
      }
    } catch (err) {
      dispatch(
        showSnackbar({
          message: "Failed to delete case",
          severity: "error",
        })
      );
    }
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchCases());
        if (response.meta.requestStatus === "fulfilled") {
          // Ensure cases are set from the response
          setCases(response.payload?.data || []);
        } else {
          dispatch(
            showSnackbar({
              message: response.payload || "Failed to fetch cases",
              severity: "error",
            })
          );
        }
      } catch (error: any) {
        dispatch(
          showSnackbar({
            message: error.message || "An error occurred while fetching cases",
            severity: "error",
          })
        );
      }
    };
    
    fetchData();
  }, [dispatch]);

  if (loading) {
    return <MinimalistHRLoader />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 mt-14">
        <h1 className="text-2xl font-bold">Disciplinary Cases</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Case
        </button>
      </div>

      {showForm ? (
        <CaseForm
          onSubmit={editingCase ? handleUpdateCase : handleAddCase}
          onCancel={() => {
            setShowForm(false);
            setEditingCase(null);
          }}
          initialData={editingCase}
        />
      ) : (
        <CaseList
          cases={cases}
          onEdit={handleEditCase}
          onDelete={handleDeleteCase}
        />
      )}
    </div>
  );
};

export default Cases;