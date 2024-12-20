import React, { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash2, AlertCircle } from "lucide-react";
import { Employee } from "../components/employees/EmployeeForm";
import EmployeeForm from "../components/employees/EmployeeForm";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  createEmployee,
  fetchEmployees,
} from "../redux/app/employees/employeeSlice";
import { useSelector } from "react-redux";
import {
  updateEmployee,
  deleteEmployee,
} from "../redux/app/employees/employeeSlice";
import snackbarMessages from "../components/messages/message";
import { fetchRolesByCompanyId } from "../redux/app/role/roleSlice";
import { showSnackbar } from "../redux/app/error/errorSlice";
import MinimalistHRLoader from "./Loading";

type AlertState = {
  message: string;
  type: "success" | "error";
};

const Employees: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const employee = useSelector((state: any) => state.employee.employees);
  const availableManagers = useSelector((state: any) => state.roles.role);
  const companyId = useSelector(
    (state: RootState) => state.verify.user?.companyId
  );
  const user = useSelector((state: RootState) => state.verify.user);
  const { error, loading } = useSelector((state: RootState) => state.employee);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [employees, setEmployees] = useState<Employee[]>(employee || []);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [alert, setAlert] = useState<AlertState | null>(null);
  const roles = useSelector((state: RootState) => state.roles.roles);
  const casesCount = useSelector((state: RootState) => state.cases.cases);

  const handleAddEmployee = async (employee: Employee): Promise<void> => {
    const roleObject = roles?.find(
      (role: any) => role?._id === employee?.roleId
    );

    const roleName = roleObject ? roleObject?.name : employee?.roleId;

    // Create a new employee object with the role name
    const employeeWithRoleName = {
      ...employee,
      role: roleName,
    };
    const response = await dispatch(
      createEmployee(employeeWithRoleName as Employee)
    );
    console.log(response);
    if (response?.meta?.requestStatus === "fulfilled") {
      dispatch(
        showSnackbar({
          message: snackbarMessages?.success?.employeeOnboarded,
          severity: "info",
        })
      );
    }
    if (response?.meta?.requestStatus === "rejected") {
      dispatch(
        showSnackbar({
          message: response.payload,
          severity: "error",
        })
      );
      setShowForm(false);
    }
    setShowForm(false);
  };

  const handleEditEmployee = async (employee: Employee): Promise<void> => {
    setEditingEmployee(employee);
    setShowForm(true);
    setEmployees((prev) =>
      prev?.map((emp) => (emp?._id === employee._id ? employee : emp))
    );
    const roleObject = roles?.find(
      (role: any) => role?._id === employee?.roleId
    );

    const roleName = roleObject ? roleObject?.name : employee?.roleId;

    // Create a new employee object with the role name
    const employeeWithRoleName = {
      ...employee,
      role: roleName,
    };
    const response = await dispatch(
      updateEmployee({
        id: employee?._id,
        employeeData: employeeWithRoleName as Employee,
      })
    );
    if (response.meta.requestStatus === "fulfilled") {
      window.location.reload();
      dispatch(
        showSnackbar({
          message: snackbarMessages?.info?.employeeEditing,
          severity: "info",
        })
      );
    } else if (error) {
      const { errors }: any = error;
      dispatch(
        showSnackbar({
          message: errors?.map((e: any) => e?.message) || "An error occurred",
          severity: "error",
        })
      );
    }
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleDeleteEmployee = async (_id: string): Promise<void> => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees((prev) => prev?.filter((emp) => emp?._id !== _id));
      const response = await dispatch(deleteEmployee(_id));
      if (response?.meta?.requestStatus === "fulfilled") {
        dispatch(
          showSnackbar({
            message: snackbarMessages?.success?.employeeDeleted,
            severity: "info",
          })
        );
      } else if (error) {
        const { errors }: any = error;
        dispatch(
          showSnackbar({
            message: errors?.map((e: any) => e?.message) || "An error occurred",
            severity: "error",
          })
        );
      }
      showAlert("Employee deleted successfully!", "success");
    }
  };

  const showAlert = (message: string, type: AlertState["type"]): void => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const filteredEmployees: Employee[] = employee?.filter(
    (employee: Employee) =>
      employee?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee?.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    dispatch(fetchEmployees());
    if (error) {
      dispatch(
        showSnackbar({
          message: error,
          severity: "error",
        })
      );
    }
  }, [updateEmployee, deleteEmployee, dispatch]);
  useEffect(() => {
    dispatch(fetchRolesByCompanyId(companyId as any));
  }, [companyId, updateEmployee, deleteEmployee, dispatch]);

  if (loading === "pending") {
    return <MinimalistHRLoader />;
  }
  const employeeCasesCount = (employeeId: string) => {
    return (
      casesCount?.filter((caseItem: any) => caseItem?.employeeId === employeeId)
        ?.length || 0
    );
  };
  // Main content renderer
  const renderEmployeeContent = () => (
    <>
      {alert && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            alert?.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {alert?.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-6 mt-14">
        <h1 className="text-2xl font-bold mt-5">Employees</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Employee
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="pl-10 pr-4 py-2 w-full md:w-96 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
          />
        </div>
      </div>

      {showForm || editingEmployee ? (
        <EmployeeForm
          onSubmit={editingEmployee ? handleEditEmployee : handleAddEmployee}
          onCancel={() => {
            setShowForm(false);
            setEditingEmployee(null);
          }}
          availableManagers={availableManagers}
          initialData={editingEmployee}
        />
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Case
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Manager
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  {user?.role !== "employee" && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees?.map((employee: Employee) => (
                  <tr
                    key={employee?._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-600 font-medium">
                              {employee?.firstName[0]}
                              {employee?.lastName[0]}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {employee?.firstName} {employee?.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee?._id && (
                        <td className="flex items-center h-12">
                          <span className="mr-2 font-semibold">Total Cases</span> 
                          <span className="mr-2 font-semibold">{employeeCasesCount(employee?._id)}</span>
                        </td>
                      )}{" "}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee?.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {employee?.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee?.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee?.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee?.managerId || "No Manager"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee?.joinDate
                        ? new Intl.DateTimeFormat("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }).format(new Date(employee?.joinDate))
                        : "No Date"}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingEmployee(employee)}
                          className="text-blue-600 hover:text-blue-800 transition duration-150"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            employee?._id && handleDeleteEmployee(employee?._id)
                          }
                          className="text-red-600 hover:text-red-800 transition duration-150"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredEmployees?.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );

  return <div className="p-6">{renderEmployeeContent()}</div>;
};

export default Employees;
