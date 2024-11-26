import React, { useState } from 'react';
import { User, Lock, Globe, Clock, Check, ChevronRight } from 'lucide-react';

const GeneralSettings = () => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Profile updated:', profileData);
  };

  const submitPasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    console.log('Password change submitted');
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl max-w-2xl mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <h2 className="text-2xl font-bold text-white">Account Settings</h2>
        <p className="text-blue-100">Personalize and secure your account</p>
      </div>

      <div className="p-6 space-y-8">
        <section className="bg-gray-50 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <User className="mr-3 h-6 w-6 text-blue-600" /> Profile Details
          </h3>
          <form onSubmit={submitProfileUpdate} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={profileData.fullName}
                onChange={handleProfileUpdate}
                className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileUpdate}
                className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={profileData.phoneNumber}
                onChange={handleProfileUpdate}
                className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                placeholder="Enter your phone number"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition flex items-center justify-center"
            >
              <Check className="mr-2" /> Update Profile
            </button>
          </form>
        </section>

        <section className="bg-gray-50 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Lock className="mr-3 h-6 w-6 text-red-600" /> Change Password
          </h3>
          <form onSubmit={submitPasswordChange} className="space-y-5">
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
          </form>
        </section>

        {/* <section className="bg-gray-50 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Clock className="mr-3 h-6 w-6 text-green-600" /> Date & Time
          </h3>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Format
              </label>
              <div className="relative">
                <select className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 appearance-none pr-10">
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 rotate-90" />
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </div>
  );
};

export default GeneralSettings;