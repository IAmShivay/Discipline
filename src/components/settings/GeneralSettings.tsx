import React, { useState } from "react";
import { User, Lock, Edit, Check, X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { resetUserPassword } from "../../redux/app/auth/authSlice";
import { AppDispatch } from "../../store";
const GeneralSettings = () => {
  const profileDatas: any = useSelector(
    (state: RootState) => state.verify.user
  );
  const [profileData, setProfileData] = useState({
    fullName: profileDatas.fullName,
    email: profileDatas.email,
    phoneNumber: profileDatas.mobile,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isEditing, setIsEditing] = useState({
    profile: false,
    password: false,
  });

  const [editedProfileData, setEditedProfileData] = useState(profileData);
  const dispatch = useDispatch<AppDispatch>();
  const handleProfileUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const submitProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileData(editedProfileData);
    setIsEditing((prev) => ({ ...prev, profile: false }));
    console.log("Profile updated:", editedProfileData);
  };

  const submitPasswordChange = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    console.log("Password change submitted");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsEditing((prev) => ({ ...prev, password: false }));
    const response = await dispatch(resetUserPassword(passwordData));
    if (response.meta.requestStatus === "fulfilled") {
      console.log("Password changed successfully");
    } else {
      console.log("An error occurred");
    }
  };

  const cancelProfileEdit = () => {
    setEditedProfileData(profileData);
    setIsEditing((prev) => ({ ...prev, profile: false }));
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl  mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <h2 className="text-2xl font-bold text-white">Account Settings</h2>
        <p className="text-blue-100">Personalize and secure your account</p>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-2 gap-8 space-y-8 lg:space-y-0">
          <section className="bg-gray-50 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <User className="mr-3 h-6 w-6 text-blue-600" /> Profile Details
              </h3>
              {!isEditing.profile ? (
                <button
                  onClick={() =>
                    setIsEditing((prev) => ({ ...prev, profile: true }))
                  }
                  className="text-blue-600 hover:text-blue-800 transition flex items-center"
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={cancelProfileEdit}
                    className="text-red-600 hover:text-red-800 transition flex items-center"
                  >
                    <X className="mr-1 h-4 w-4" /> Cancel
                  </button>
                </div>
              )}
            </div>
            <form onSubmit={submitProfileUpdate} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                {isEditing.profile ? (
                  <input
                    type="text"
                    name="fullName"
                    value={editedProfileData.fullName}
                    onChange={handleProfileUpdate}
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="py-2.5 px-4 text-gray-800">
                    {profileData.fullName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                {isEditing.profile ? (
                  <input
                    type="email"
                    name="email"
                    value={editedProfileData.email}
                    onChange={handleProfileUpdate}
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    placeholder="Enter your email"
                  />
                ) : (
                  <p className="py-2.5 px-4 text-gray-800">
                    {profileData.email}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                {isEditing.profile ? (
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={editedProfileData.phoneNumber}
                    onChange={handleProfileUpdate}
                    className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <p className="py-2.5 px-4 text-gray-800">
                    {profileData.phoneNumber}
                  </p>
                )}
              </div>
              {isEditing.profile && (
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition flex items-center justify-center"
                >
                  <Check className="mr-2" /> Save Changes
                </button>
              )}
            </form>
          </section>

          <section className="bg-gray-50 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Lock className="mr-3 h-6 w-6 text-red-600" /> Change Password
              </h3>
              {!isEditing.password ? (
                <button
                  onClick={() =>
                    setIsEditing((prev) => ({ ...prev, password: true }))
                  }
                  className="text-red-600 hover:text-red-800 transition flex items-center"
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </button>
              ) : (
                <button
                  onClick={() =>
                    setIsEditing((prev) => ({ ...prev, password: false }))
                  }
                  className="text-red-600 hover:text-red-800 transition flex items-center"
                >
                  <X className="mr-1 h-4 w-4" /> Cancel
                </button>
              )}
            </div>
            <form onSubmit={submitPasswordChange} className="space-y-5">
              {isEditing.password && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-lg hover:opacity-90 transition flex items-center justify-center"
                  >
                    <Lock className="mr-2" /> Change Password
                  </button>
                </>
              )}
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
