// types.ts
export interface CustomField {
  id: string;
  name: string;
  type: string;
  required: boolean;
  options?: string[];
}

export interface Manager {
  _id: string;
  name: string;
  role: string;
  fullName: string;
}

export type EmployeeStatus = "active" | "under_review" | "hold" | "terminated";

export interface Employee {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  phone: string;
  department: string;
  position: string;
  joinDate: string;
  roleId: string;
  managerId?: string;
  status: EmployeeStatus;
  companyId: string;
  customFields: Record<string, string>;
}

// EmployeeForm.tsx
import React, { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { RootState } from "../../store";
import { fetchRoles } from "../../redux/app/role/roleSlice";
import { useSelector } from "react-redux";
interface EmployeeFormProps {
  onSubmit: (employee: Employee) => void;
  onCancel: () => void;
  availableManagers?: Manager[];
  companyId?: string;
  initialData?: any;
}

interface Role {
  id: string;
  name: string;
}

interface StatusOption {
  value: EmployeeStatus;
  label: string;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  onSubmit,
  onCancel,
  availableManagers = [],
  companyId,
  initialData,
}) => {
  // const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [canAssignManager, setCanAssignManager] = useState(false);

  const [formData, setFormData] = useState<Partial<Employee>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    position: "",
    joinDate: "",
    roleId: "",
    managerId: "",
    status: "active",
    companyId: companyId || "",
    customFields: {},
  });
  const dispatch = useDispatch<AppDispatch>();
  const roles = useSelector((state: RootState) => state.roles.roles || []);
  const [filteredManagers, setFilteredManagers] = useState<Manager[]>([]);
  useEffect(() => {
    if (formData?.roleId) {
      const selectedRole = roles?.find((role) => role?._id === formData?.roleId);

      if (selectedRole) {
        const isEmployeeRole = selectedRole?.name.toLowerCase() === "employee";
        setCanAssignManager(isEmployeeRole);

        if (!isEmployeeRole) {
          setFormData((prev) => ({ ...prev, managerId: "" }));
        }
      }
      // Filter out the "employee" role
      const managerRoles  = roles?.filter(
        (role) => role.name?.toLowerCase() !== "employee"
      );

      // Filter available managers based on the non-employee roles
      const filtered = availableManagers?.filter((manager) =>
        managerRoles?.some((role) => role?.name === manager?.role)
      );
      setFilteredManagers(filtered);
    }
  }, [formData?.roleId, roles, availableManagers]);
  useEffect(() => {
    if (initialData) {
      setFormData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
    }
  }, [initialData]);
  const statusOptions: StatusOption[] = [
    { value: "active", label: "Active" },
    { value: "under_review", label: "Under Review" },
    { value: "hold", label: "On Hold" },
    { value: "terminated", label: "Terminated" },
  ];
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit(formData as Employee);
  };
  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Add New Employee</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData?.firstName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData?.lastName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="roleId"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="roleId"
              name="roleId"
              value={formData?.roleId}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select Role</option>
              {roles?.map((role) => (
                <option key={role?._id} value={role?._id}>
                  {role?.name?.toLocaleUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="managerId"
              className="block text-sm font-medium text-gray-700"
            >
              Manager
            </label>
            <select
              id="managerId"
              name="managerId"
              value={formData?.managerId}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={!filteredManagers || filteredManagers?.length === 0}
            >
              <option value="">Select Manager</option>
              {filteredManagers?.map((manager) => (
                <option key={manager?._id} value={manager?._id}>
                  {manager?.fullName} ({manager?.role})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData?.status}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              {statusOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData?.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700"
            >
              Department
            </label>
            <input
              id="department"
              type="text"
              name="department"
              value={formData?.department}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700"
            >
              Position
            </label>
            <input
              id="position"
              type="text"
              name="position"
              value={formData?.position}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="joinDate"
              className="block text-sm font-medium text-gray-700"
            >
              Join Date
            </label>
            <input
              id="joinDate"
              type="date"
              name="joinDate"
              value={formData?.joinDate}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* {customFields.length > 0 && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Custom Fields</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customFields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.name}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>
                  {field.type === "select" ? (
                    <select
                      value={formData.customFields?.[field.id] || ""}
                      onChange={(e) =>
                        handleCustomFieldChange(field.id, e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required={field.required}
                    >
                      <option value="">Select an option</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={formData.customFields?.[field.id] || ""}
                      onChange={(e) =>
                        handleCustomFieldChange(field.id, e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required={field.required}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* <div className="border-t pt-6">
          <CustomFieldForm onAddField={handleAddCustomField} />
        </div> */}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {initialData ? "Update Employee" : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
