import React, { useState, useEffect, useRef } from "react";
import { AppDispatch, RootState } from "../store";
import { Settings, LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/app/auth/authSlice";
import snackbarMessages from "./messages/message";
import { showSnackbar } from "../redux/app/error/errorSlice";
import { useNavigate } from "react-router-dom";
interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
}

const UserProfileMenu: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, error } = useSelector((state: RootState) => state.verify);
  const { fullName, email }: any = user;
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [profile, setProfile] = useState<UserProfile>({
    name: fullName,
    email: email,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editForm);
    setIsEditing(false);
  };
  const handleLogout = async () => {
    const response = await dispatch(logoutUser());
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(
        showSnackbar({
          message: snackbarMessages.info.logoutMessage,
          severity: "info",
        })
      );
    } else if (error) {
      const { errors }: any = error;
      dispatch(
        showSnackbar({
          message: errors?.map((e: any) => e.message) || "An error occurred",
          severity: "error",
        })
      );
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="text-sm font-medium text-white">
            {profile.name.charAt(0)}
          </span>
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-white">{profile.name}</p>
          <p className="text-xs text-gray-400">{profile.email}</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-72 bg-white rounded-lg shadow-lg py-2">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn btn-secondary text-sm"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary text-sm">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <>
              <div className="px-4 py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-lg font-medium text-white">
                      {profile.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {profile.name}
                    </p>
                    <p className="text-sm text-gray-500">{profile.email}</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 mt-2">
                <button
                  onClick={() => navigate("/settings")}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Edit Profile
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfileMenu;
