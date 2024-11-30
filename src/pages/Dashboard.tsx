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
  const openCases = cases?.filter((c) => c.status === "OPEN")?.length;
  const closedCases = cases?.filter((c) => c.status === "CLOSED")?.length;
  const pendingResponses = cases?.filter(
    (c) => c.status === "PENDING_RESPONSE"
  )?.length;

  const mockStats: DashboardStatsType = {
    totalCases: cases?.length || 0,
    openCases: openCases || 0,
    closedCases: closedCases || 0,
    pendingActions: pendingResponses,
  };
  useEffect(() => {
    dispatch(fetchCases());
  }, [dispatch]);
  console.log(cases);
  const mockCases = cases?.map((caseItem) => ({
    id: caseItem._id,
    title: caseItem.title,
    status: caseItem.status,
    description: caseItem.description,
    incidentDate: caseItem.incidentDate,
    createdAt: caseItem.createdAt,
    updatedAt: caseItem.updatedAt,
    assignedTo: caseItem.employeeName,
    employeeName: caseItem.employeeName,
  }));
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
