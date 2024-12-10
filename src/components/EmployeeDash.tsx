import React from 'react';
import { ArrowRight, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const WelcomeDashboard = () => {
  const { user } = useSelector((state: RootState) => state.verify);
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/cases");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="relative w-full max-w-md">
        {/* Background shape */}
        <div className="absolute -inset-4 bg-blue-200 opacity-50 rounded-xl blur-2xl transform -rotate-6"></div>

        {/* Main card */}
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100">
          {/* Decorative header */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500"></div>
          
          <div className="p-8 text-center">
            {/* User icon */}
            <div className="mx-auto mb-6 w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <UserCheck className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
            </div>

            {/* Welcome message */}
            <h1 className="text-3xl font-extrabold mb-4 text-blue-800">
              Welcome, {user?.fullName}!
            </h1>
            
            <p className="text-blue-700 mb-8 text-lg leading-relaxed opacity-80">
              You're all set to streamline your workflow and manage your cases effortlessly.
            </p>

            {/* Explore button with enhanced interaction */}
            <button
              onClick={handleExplore}
              className="w-full flex items-center justify-center 
                bg-blue-600 
                text-white py-4 rounded-xl 
                hover:bg-blue-700 
                transition duration-300 ease-in-out 
                transform hover:scale-105 
                active:scale-95 
                focus:outline-none 
                focus:ring-4 
                focus:ring-blue-300"
            >
              <span className="font-semibold">Explore Cases</span>
              <ArrowRight className="ml-3 w-6 h-6" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeDashboard;