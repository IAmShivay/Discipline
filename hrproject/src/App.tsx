import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<GeneralRoutes />} />
        <Route path="/app/*" element={<PrivateRoutes />} />
        <Route path="*" element={<Navigate to="/user/login" replace />} />
      </Routes>
    </Router>
  );
}

const GeneralRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

const PrivateRoutes: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/cases/:id" element={<CaseDetails />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;