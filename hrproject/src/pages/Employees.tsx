// types.ts
export interface Manager {
  id: string;
  name: string;
  role: string;
  department: string;
}

export interface AlertState {
  message: string;
  type: "success" | "error";
}

// Employees.tsx
import React, { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Employee } from "../components/employees/EmployeeForm";
import EmployeeForm from "../components/employees/EmployeeForm";

const availableManagers = [
  { id: "1", name: "John Doe", role: "manager" },
  { id: "2", name: "Jane Smith", role: "supervisor" },
  // ... more managers
];
const initialEmployees: Employee[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+123456789",
    department: "Engineering",
    position: "Software Engineer",
    joinDate: "2021-05-10",
    roleId: "R1",
    managerId: "3",
    status: "active", // Assuming EmployeeStatus is a string enum or type
    companyId: "C1",
    customFields: {
      github: "johndoe123",
      linkedin: "linkedin.com/in/johndoe",
    },
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+987654321",
    department: "Marketing",
    position: "Marketing Specialist",
    joinDate: "2020-03-15",
    roleId: "R2",
    status: "active",
    companyId: "C1",
    customFields: {
      portfolio: "janesmithdesigns.com",
      twitter: "@janesmith",
    },
  },
  {
    id: "3",
    firstName: "Alice",
    lastName: "Brown",
    email: "alice.brown@example.com",
    phone: "+1122334455",
    department: "Human Resources",
    position: "HR Manager",
    joinDate: "2019-01-20",
    roleId: "R3",
    status: "terminated",
    companyId: "C2",
    customFields: {
      certification: "SHRM-CP",
    },
  },
];

const Employees: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [alert, setAlert] = useState<AlertState | null>(null);

  const handleAddEmployee = (employee: Employee): void => {
    const newEmployee = {
      ...employee,
      id: (employees.length + 1).toString(),
    };
    setEmployees((prev) => [...prev, newEmployee]);
    setShowForm(false);
    showAlert("Employee added successfully!", "success");
  };

  const handleEditEmployee = (employee: Employee): void => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === employee.id ? employee : emp))
    );
    setEditingEmployee(null);
    showAlert("Employee updated successfully!", "success");
  };

  const handleDeleteEmployee = (id: string): void => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      showAlert("Employee deleted successfully!", "success");
    }
  };

  const showAlert = (message: string, type: AlertState["type"]): void => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {alert && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            alert.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {alert.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-6 mt-5">
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-600 font-medium">
                              {employee.firstName[0]}
                              {employee.lastName[0]}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {employee.firstName} {employee.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {employee.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {availableManagers.find(
                        (m) => m.id === employee.managerId
                      )?.name || "No Manager"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(employee.joinDate).toLocaleDateString()}
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
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="text-red-600 hover:text-red-800 transition duration-150"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredEmployees.length === 0 && (
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
    </div>
  );
};

export default Employees;
