import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Cases from "./pages/Cases";
import CaseDetails from "./pages/CaseDetails";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import React from "react";
import { useDispatch } from "react-redux";
import RoleManagement from "./components/role";
import TwoStepForgotPasswordPage from "./pages/ForgotPassword";
import ChangePasswordPage from "./components/ChangePassword";
import MinimalistHRLoader from "./pages/Loading";
import { showSnackbar } from "./redux/app/error/errorSlice";
import {
  fetchCase,
  fetchEmployee,
  loadData,
  fetchCategorie,
  fetchNotification,
} from "./utility/centralApicalls";
// Define proper type for RootState
interface RootState {
  verify: {
    isAuthenticated: boolean;
    user: any; // Replace 'any' with proper user type
  };
}

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state?.verify
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await loadData(dispatch, setError, setLoading); // Fetch user data
      await fetchCategorie(dispatch, setError, setLoading); // Fetch categories
      await fetchNotification(dispatch, setError, setLoading); // Fetch notifications
      await fetchCase(dispatch, setError, setLoading); // Fetch cases
      await fetchEmployee(dispatch, setError, setLoading);
    };
    if (error) {
      dispatch(showSnackbar({ message: error, severity: "error" }));
    }
    fetchData();
  }, [dispatch]);
  if (loading) return <MinimalistHRLoader />;
  return (
    <Router>
      <Routes>
        <Route path="/auth/*" element={<PublicRoutes />} />
        <Route
          path="/*"
          element={
            <ProtectedRoutes
              isAuthenticated={isAuthenticated}
              role={user?.role}
            />
          }
        />
      </Routes>
    </Router>
  );
};

interface PrivateRouteProps {
  isAuthenticated: boolean;
  role: string;
}

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="reset-password" element={<ChangePasswordPage />} />
      <Route path="forgot-password" element={<TwoStepForgotPasswordPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
};

const ProtectedRoutes: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  role,
}) => {
  const location = useLocation();

  if (!isAuthenticated) {
    // Save the current location they were trying to go to
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          {/* Default route to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Routes for admin */}
          {role !== "employee" && (
            <>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="roles" element={<RoleManagement />} />
              <Route path="employees" element={<Employees />} />
              <Route path="settings" element={<Settings />} />
              <Route path="cases" element={<Cases />} />
              <Route path="cases/:id" element={<CaseDetails />} />
              <Route path="notifications" element={<Notifications />} />
            </>
          )}

          {/* Routes for employees */}
          {role === "employee" && (
            <>
              <Route path="settings" element={<Settings />} />
              <Route path="cases" element={<Cases />} />
              <Route path="cases/:id" element={<CaseDetails />} />
              <Route path="notifications" element={<Notifications />} />
            </>
          )}

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
