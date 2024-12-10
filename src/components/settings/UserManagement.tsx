import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { registerUser } from "../../redux/app/auth/userManagementSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../src/store";
import { fetchRolesByCompanyId } from "../../redux/app/role/roleSlice";
import { updateUser } from "../../redux/app/auth/userManagementSlice";
import { showSnackbar } from "../../redux/app/error/errorSlice";
// User interface

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  permissions: string[];
}

// Available permission options

const PERMISSION_OPTIONS = ["read", "write", "delete", "create", "update"];

// Validation schema
const UserSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Name is too short!")
    .max(50, "Name is too long!")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  role: Yup.string()
    .required("Role is required")
    .oneOf(["Super Admin", "HR Manager", "Editor", "Viewer,", "employee","Employee"], "Invalid role"),
  status: Yup.string()
    .oneOf(["active", "inactive"], "Invalid status")
    .required("Status is required"),
  permissions: Yup.array()
    .of(Yup.string().oneOf(PERMISSION_OPTIONS, "Invalid permission"))
    .min(1, "At least one permission is required"),
});

const UserManagement = () => {
  const { user } = useSelector((state: RootState) => state.verify);
  const roles = useSelector((state: RootState) => state.roles.role);
  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = useState<User[]>(roles as any);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleSubmit = async (values: User, { resetForm }: any) => {
    if (editingUser) {
      setUsers(
        users.map((user) =>
          user._id === editingUser._id ? { ...values, id: user._id } : user
        )
      );
      dispatch(updateUser(values));
      setEditingUser(null);
    } else {
      try {
        const { _id, ...userData } = values;

        const resultAction = await dispatch(registerUser(userData)).unwrap();
        console.log("resultAction", resultAction);
        window.location.reload();
        if (resultAction?.meta?.requestStatus === "fulfilled") {
          dispatch(
            showSnackbar({
              message: "User registered successfully",
              severity: "success",
            })
          );
        }
      } catch (error: any) {
        dispatch(
          showSnackbar({
            message: error || "Failed to register user",
            severity: "error",
          })
        );
      }
    }

    setShowAddUser(false);
    resetForm();
  };

  // Delete User Handler
  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  // Edit User Handler
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowAddUser(true);
  };

  useEffect(() => {
    (async () => {
      if (user?.companyId) {
        const response = await dispatch(fetchRolesByCompanyId(user?.companyId));
        if (response?.meta.requestStatus === "fulfilled") {
          setUsers(response.payload);
        }
      }
    })();
  }, [dispatch, user?.companyId, updateUser]);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            User Management
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Manage admin users, roles, and permissions
          </p>
        </div>
        <button
          onClick={() => {
            setShowAddUser(true);
            setEditingUser(null);
          }}
          className="btn btn-primary flex items-center gap-2 text-sm px-3 py-2"
        >
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* User Form Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => {
                setShowAddUser(false);
                setEditingUser(null);
              }}
              className="absolute top-4 right-4"
            >
              <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </button>
            <h3 className="text-lg font-semibold mb-4">
              {editingUser ? "Edit User" : "Add New User"}
            </h3>
            <Formik
              initialValues={
                editingUser || {
                  _id: "",
                  fullName: "",
                  email: "",
                  role: "",
                  status: "active",
                  permissions: ["read"],
                }
              }
              validationSchema={UserSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form className="space-y-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <Field
                      name="fullName"
                      className={`mt-1 block w-full rounded-md border ${
                        errors.fullName && touched.fullName
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } shadow-sm focus:border-blue-500 focus:ring-1`}
                    />
                    <ErrorMessage
                      name="fullName"
                      component="p"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className={`mt-1 block w-full rounded-md border ${
                        errors.email && touched.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } shadow-sm focus:border-blue-500 focus:ring-1`}
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Role
                    </label>
                    <Field
                      as="select"
                      name="role"
                      className={`mt-1 block w-full rounded-md border ${
                        errors.role && touched.role
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } shadow-sm focus:border-blue-500 focus:ring-1`}
                    >
                      <option value="">Select Role</option>
                      <option value="Super Admin">Super Admin</option>
                      <option value="employee">Employee</option>
                      <option value="HR Manager">HR Manager</option>
                      {/* <option value="Editor">Editor</option>
                      <option value="Viewer">Viewer</option> */}
                    </Field>
                    <ErrorMessage
                      name="role"
                      component="p"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Permissions
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {PERMISSION_OPTIONS.map((permission) => (
                        <label
                          key={permission}
                          className="inline-flex items-center"
                        >
                          <input
                            type="checkbox"
                            name="permissions"
                            value={permission}
                            checked={values.permissions.includes(permission)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setFieldValue(
                                "permissions",
                                checked
                                  ? [...values.permissions, permission]
                                  : values.permissions.filter(
                                      (p) => p !== permission
                                    )
                              );
                            }}
                            className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700 capitalize">
                            {permission}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.permissions && touched.permissions && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.permissions as string}
                      </p>
                    )}
                  </div> */}

                  {/* <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Status
                    </label>
                    <Field
                      as="select"
                      name="status"
                      className={`mt-1 block w-full rounded-md border ${
                        errors.status && touched.status
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } shadow-sm focus:border-blue-500 focus:ring-1`}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="p"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div> */}

                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddUser(false);
                        setEditingUser(null);
                      }}
                      className="btn btn-secondary text-sm"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary text-sm">
                      {editingUser ? "Update User" : "Add User"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* User Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              {/* <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th> */}
              {/* <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th> */}
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.fullName}
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.role}</div>
                </td>
                {/* <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {user.permissions.map((permission) => (
                      <span
                        key={permission}
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            permission === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : permission === "write"
                              ? "bg-blue-100 text-blue-800"
                              : permission === "read"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </td> */}
                {/* <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td> */}
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    {/* <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
