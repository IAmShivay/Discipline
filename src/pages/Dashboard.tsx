import DashboardStats from "../components/DashboardStats";
import RecentCases from "../components/RecentCases";
import { RootState } from "../store";
import type { DashboardStats as DashboardStatsType } from "../types";
// import type { DisciplinaryCase } from '../types';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCases } from "../redux/app/cases/caseSlice";
import { AppDispatch } from "../store";
// Temporary mock data

function Dashboard() {
  const dispatch: AppDispatch = useDispatch();
  const cases = useSelector((state: RootState) => state.cases.cases);
  const openCases = cases.filter((c) => c.status === "OPEN").length;
  const closedCases = cases.filter((c) => c.status === "CLOSED").length;
  const pendingResponses = cases.filter(
    (c) => c.status === "PENDING_RESPONSE"
  ).length;

  const mockStats: DashboardStatsType = {
    totalCases: cases.length || 0,
    openCases: openCases || 0,
    closedCases: closedCases || 0,
    pendingActions: pendingResponses,
  };
  useEffect(() => {
    dispatch(fetchCases());
  }, [dispatch]);

  const mockCases: any = [
    {
      id: "1",
      employeeName: "John Smith",
      title: "Attendance Policy Violation",
      description: "Multiple instances of tardiness in the past month",
      status: "OPEN",
      incidentDate: "2024-03-10",
      assignedTo: "Sarah Johnson",
      createdAt: "2024-03-11",
      updatedAt: "2024-03-11",
    },
    {
      id: "2",
      employeeName: "Emma Davis",
      title: "Code of Conduct Breach",
      description: "Inappropriate behavior during team meeting",
      status: "DRAFT",
      incidentDate: "2024-03-09",
      assignedTo: "Michael Brown",
      createdAt: "2024-03-10",
      updatedAt: "2024-03-10",
    },
    {
      id: "3",
      employeeName: "Robert Wilson",
      title: "Performance Issue",
      description: "Failure to meet project deadlines",
      status: "CLOSED",
      incidentDate: "2024-02-28",
      assignedTo: "Sarah Johnson",
      createdAt: "2024-03-01",
      updatedAt: "2024-03-08",
    },
  ];
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mt-14">Dashboard</h1>
        <p className="text-gray-500 mt-5">Welcome back, Admin</p>
      </div>

      <DashboardStats stats={mockStats} />

      <div className="mt-8">
        <RecentCases cases={mockCases} />
      </div>
    </div>
  );
}

export default Dashboard;
