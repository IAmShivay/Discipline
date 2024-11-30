import React, { useState, useCallback, useEffect } from "react";
import { Users, UserPlus, Edit3, Save, Trash2, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { createRole, fetchRoles } from "../redux/app/role/roleSlice";

interface Role {
  _id: string | number;
  name: string;
  companyId?: string;
  description: string;
  permissions: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const RoleManagement: React.FC = () => {
  const { roles, loading, error } = useSelector(
    (state: RootState) => state?.roles
  );
  const [roless, setRoles] = useState<Role[]>(roles);
  const dispatch = useDispatch<AppDispatch>();

  const [newRole, setNewRole] = useState<Omit<Role, "_id">>({
    name: "",
    description: "",
    permissions: [],
    companyId: "",
  });
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [mobileView, setMobileView] = useState<"create" | "list">("list");

  const permissionOptions = ["create", "read", "update", "delete"];

  const filteredRoles = roles?.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRole = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!newRole.name) return;

      const roleToAdd: Role = {
        ...newRole,
        _id: Date.now(),
      };
      dispatch(createRole(newRole));
      setRoles((prev) => [...prev, roleToAdd]);
      setNewRole({ name: "", description: "", permissions: [] });
      setMobileView("list");
    },
    [newRole]
  );

  const handleUpdateRole = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingRole?.name) return;

      setRoles((prev) =>
        prev?.map((role) => (role._id === editingRole._id ? editingRole : role))
      );
      setEditingRole(null);
      setMobileView("list");
    },
    [editingRole]
  );

  const handleDeleteRole = useCallback((roleId: string | number) => {
    setRoles((prev) => prev?.filter((role) => role._id !== roleId));
  }, []);
  useEffect(() => {
    if (roles?.length === 0) {
      dispatch(fetchRoles());
    }
  }, [dispatch, roles]);
  const RoleForm = () => (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        {editingRole ? (
          <Edit3 className="mr-2" />
        ) : (
          <UserPlus className="mr-2" />
        )}
        {editingRole ? "Edit Role" : "Create New Role"}
      </h3>
      <form
        onSubmit={editingRole ? handleUpdateRole : handleAddRole}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Role Name"
          value={editingRole ? editingRole.name : newRole.name}
          onChange={(e) =>
            editingRole
              ? setEditingRole({ ...editingRole, name: e.target.value })
              : setNewRole({ ...newRole, name: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Description"
          value={editingRole ? editingRole.description : newRole.description}
          onChange={(e) =>
            editingRole
              ? setEditingRole({ ...editingRole, description: e.target.value })
              : setNewRole({ ...newRole, description: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          rows={3}
        />

        <div>
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            Permissions
          </label> */}
          {/* <div className="grid grid-cols-2 gap-2">
            {permissionOptions.map((perm) => (
              <label key={perm} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={
                    editingRole
                      ? editingRole.permissions.includes(perm)
                      : newRole.permissions.includes(perm)
                  }
                  onChange={() => {
                    const updatePermissions = (current: string[]) =>
                      current.includes(perm)
                        ? current.filter((p) => p !== perm)
                        : [...current, perm];

                    editingRole
                      ? setEditingRole({
                          ...editingRole,
                          permissions: updatePermissions(
                            editingRole.permissions
                          ),
                        })
                      : setNewRole({
                          ...newRole,
                          permissions: updatePermissions(newRole.permissions),
                        });
                  }}
                  className="mr-2"
                />
                {perm}
              </label>
            ))}
          </div> */}
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
          >
            <Save className="mr-2" />
            {editingRole ? "Update Role" : "Create Role"}
          </button>
          {/* Mobile view toggle back to list */}
          <button
            type="button"
            onClick={() => setMobileView("list")}
            className="sm:hidden bg-gray-200 text-gray-800 py-2 px-4 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  const RoleList = () => (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Users className="mr-2" /> Existing Roles
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search roles"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-2 top-3 text-gray-400" />
        </div>
      </div>

      <div className="space-y-4">
        {filteredRoles?.map((role) => (
          <div
            key={role._id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-md hover:bg-gray-50 transition"
          >
            <div className="mb-2 sm:mb-0">
              <div className="font-semibold text-gray-800">
                {role.name.toUpperCase()}
              </div>
              <div className="text-sm text-gray-500">{role.description}</div>
              {/* <div className="mt-2 flex flex-wrap gap-2">
                {role.permissions.map((perm) => (
                  <span
                    key={perm}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                  >
                    {perm}
                  </span>
                ))}
              </div> */}
            </div>
            {/* <div className="flex space-x-2">
              <button
                onClick={() => {
                  setEditingRole(role);
                  setMobileView("create");
                }}
                className="text-blue-600 hover:bg-blue-50 p-2 rounded"
              >
                <Edit3 className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDeleteRole(role?._id)}
                className="text-red-600 hover:bg-red-50 p-2 rounded"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div> */}
          </div>
        ))}
      </div>

      {/* Mobile Add Role Button */}
      <button
        onClick={() => setMobileView("create")}
        className="sm:hidden w-full mt-4 bg-blue-600 text-white py-2 rounded-md flex items-center justify-center"
      >
        <UserPlus className="mr-2" /> Add New Role
      </button>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
            <Users className="mr-2 sm:mr-3" /> Role Management
          </h2>
        </div>

        {/* Mobile View Toggle */}
        <div className="sm:hidden flex mb-4">
          <button
            onClick={() => setMobileView("list")}
            className={`w-1/2 py-2 ${
              mobileView === "list" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Role List
          </button>
          <button
            onClick={() => setMobileView("create")}
            className={`w-1/2 py-2 ${
              mobileView === "create" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Create Role
          </button>
        </div>

        {/* Responsive Layout */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Desktop View */}
          <div className="hidden sm:block md:col-span-1">{RoleForm()}</div>
          <div className="hidden sm:block md:col-span-2">{RoleList()}</div>

          {/* Mobile View */}
          <div className="sm:hidden w-full">
            {mobileView === "create" ? RoleForm() : RoleList()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;
