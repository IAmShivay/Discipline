import React, { useEffect, useState } from "react";
import { Save, X, Upload } from "lucide-react";
import type { DisciplinaryCase } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { fetchEmployees } from "../../redux/app/employees/employeeSlice";
import { AppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { Employee } from "../employees/EmployeeForm";
interface CaseFormProps {
  onSubmit: (case_: DisciplinaryCase) => void;
  onCancel: () => void;
  initialData?: DisciplinaryCase | null;
}

const CaseForm: React.FC<CaseFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const employee = useSelector((state: any) => state.employee.employees);
  const dispatch = useDispatch<AppDispatch>();
  console.log("ok", employee);
  const [formData, setFormData] = useState<DisciplinaryCase>(
    initialData || {
      title: "",
      employeeName: "",
      category: "",
      incidentDate: "",
      description: "",
      attachments: [] as File[],
    }
  );
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...Array.from(e.target.files!)],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCase: DisciplinaryCase = {
      id: uuidv4(),
      ...formData,
      status: "DRAFT",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    console.log(newCase);
    onSubmit(newCase);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Create New Case</h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Case Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee Name
            </label>
            <select
              name="employeeName"
              value={formData.employeeName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select Employee</option>
              {employee.map((employee: Employee) => (
                <option
                  key={employee._id}
                  value={`${employee.firstName} ${employee.lastName}`}
                >
                  {`${employee.firstName} ${employee.lastName}`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              <option value="ATTENDANCE">Attendance</option>
              <option value="MISCONDUCT">Misconduct</option>
              <option value="POLICY_VIOLATION">Policy Violation</option>
              <option value="PERFORMANCE">Performance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Incident Date
            </label>
            <input
              type="date"
              name="incidentDate"
              value={formData.incidentDate}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Attachments
          </label>
          <div className="flex items-center space-x-2">
            <label className="btn btn-secondary flex items-center gap-2 cursor-pointer">
              <Upload className="w-4 h-4" />
              Upload Files
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span className="text-sm text-gray-500">
              {formData.attachments.length} files selected
            </span>
          </div>
          {formData.attachments.length > 0 && (
            <ul className="mt-2 space-y-1">
              {formData.attachments.map((file: any, index: number) => (
                <li
                  key={index}
                  className="text-sm text-gray-600 flex items-center space-x-2"
                >
                  <span>{file.name}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        attachments: prev.attachments.filter(
                          (_: any, i: number) => i !== index
                        ),
                      }))
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

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
            Create Case
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaseForm;
