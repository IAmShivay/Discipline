import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Cases from './pages/Cases';
import CaseDetails from './pages/CaseDetails';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import SignupPage from './pages/signup';
import LoginPage from './pages/login';
import React from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/app/auth/checkAuthSlice';
import { useEffect } from 'react';
import LoadingComponent from './components/LoadingComponent';
const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: any) => state.verify
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await dispatch<any>(loadUser());
      setLoading(false);
    };
    loadData();
  }, [dispatch]);
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <Router>
      <Routes>
        <Route path="/auth/*" element={<PublicRoutes isAuthenticated={isAuthenticated} />} />
        <Route path="/*" element={<ProtectedRoutes isAuthenticated={isAuthenticated} />} />
      </Routes>
    </Router>
  );
}
interface PrivateRouteProps {
  isAuthenticated: boolean;
}
const PublicRoutes: React.FC<PrivateRouteProps> = ({ isAuthenticated }) => {

  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}

const ProtectedRoutes: React.FC<PrivateRouteProps> = ({ isAuthenticated }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
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
}

export default App;