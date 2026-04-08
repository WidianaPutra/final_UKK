"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PsAdminLayout from "@/components/ps/PsAdminLayout";
import AdminSection from "@/sections/ps/PsAdmin/AdminSection";
import AdminClassSection from "@/sections/ps/PsAdmin/ClassSection";
import AdminReportCategorySection from "@/sections/ps/PsAdmin/ReportCategory";
import AdminReportSection from "@/sections/ps/PsAdmin/ReportSection";
import AdminStudentSection from "@/sections/ps/PsAdmin/StudentSection";
import PsSVG from "@/components/ps/PsSVG";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import StatCard from "@/components/ps/PsStatCard";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    report: 0,
    student: 0,
    admin: 0,
    class: 0,
    reportCategory: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/statistics");
        setStats(res.data.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading)
    return <div className="text-gray-400 italic">Memuat statistik...</div>;

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="p-8 bg-black text-white rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-black">Selamat Datang, Admin!</h1>
          <p className="text-gray-400 mt-2 max-w-md">
            Sistem Manajemen Pengaduan Siswa (SMPS) siap digunakan. Pantau
            laporan dan kelola data sekolah Anda di sini.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Laporan"
          value={stats.report}
          icon="list"
          colorClass="bg-yellow-400"
        />
        <StatCard
          title="Total Siswa"
          value={stats.student}
          icon="graduation-cap"
          colorClass="bg-blue-400"
        />
        <StatCard
          title="Total Admin"
          value={stats.admin}
          icon="user"
          colorClass="bg-green-400"
        />
        <StatCard
          title="Total Kelas"
          value={stats.class}
          icon="book-open-text"
          colorClass="bg-purple-400"
        />
        <StatCard
          title="Kategori Laporan"
          value={stats.reportCategory}
          icon="layers"
          colorClass="bg-red-400"
        />
      </div>
    </div>
  );
};

export default function AdminPage() {
  const params = useSearchParams();
  const sec = params.get("sec");

  const renderSection = () => {
    switch (sec) {
      case "laporan":
        return <AdminReportSection />;
      case "siswa":
        return <AdminStudentSection />;
      case "admin":
        return <AdminSection />;
      case "class":
        return <AdminClassSection />;
      case "category":
        return <AdminReportCategorySection />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <PsAdminLayout containClassName="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-gray-400 uppercase tracking-[0.2em] font-black">
            Management System
          </p>
          <h2 className="text-4xl font-black text-black capitalize mt-1">
            {sec || "Overview"}
          </h2>
        </div>

        <Suspense
          fallback={
            <div className="p-10 text-center italic text-gray-400">
              Loading...
            </div>
          }
        >
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {renderSection()}
          </div>
        </Suspense>
      </div>
    </PsAdminLayout>
  );
}
