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
import { loadUser } from "./redux/app/auth/checkAuthSlice";
import RoleManagement from "./components/role";
import TwoStepForgotPasswordPage from "./pages/ForgotPassword";
import ChangePasswordPage from "./components/ChangePassword";
import MinimalistHRLoader from "./pages/Loading";
import { fetchRoles } from "./redux/app/role/roleSlice";

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
    const loadData = async () => {
      try {
        await dispatch<any>(loadUser());
      } catch (err) {
        setError(err instanceof Error ? err?.message : "Failed to load user");
      } finally {
        setLoading(false);
      }
    };
    const fetchRole = async () => {
      try {
        await dispatch<any>(fetchRoles());
      } catch (err) {
        setError(err instanceof Error ? err?.message : "Failed to load user");
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
    loadData();
  }, [dispatch]);

  if (loading) {
    return <MinimalistHRLoader />;
  }

  if (error) {
    // You might want to add proper error handling UI here
    return <div>Error: {error}</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/auth/*" element={<PublicRoutes />} />
        <Route
          path="/*"
          element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

interface PrivateRouteProps {
  isAuthenticated: boolean;
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

const ProtectedRoutes: React.FC<PrivateRouteProps> = ({ isAuthenticated }) => {
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
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="roles" element={<RoleManagement />} />
          <Route path="employees" element={<Employees />} />
          <Route path="cases" element={<Cases />} />
          <Route path="cases/:id" element={<CaseDetails />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
