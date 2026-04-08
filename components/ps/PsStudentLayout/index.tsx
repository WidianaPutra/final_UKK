"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PsSVG from "@/components/ps/PsSVG";
import PsTooltip from "@/components/ps/PsTooltip";
import { PsAlert } from "@/components/ps/PsAlert";

export default function PsStudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/me");
        setUser(res.data.data);
      } catch (err) {
        window.location.href = "/login";
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="h-16 bg-white border-b-4 border-black px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-black p-1.5 rounded-lg">
            <PsSVG name="home" className="text-white" size={20} />
          </div>
          <h1 className="font-black text-xl tracking-tighter">SMPS STUDENT</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-1.5 rounded-full border-2 border-black">
            <PsSVG name="user" size={18} strokeWidth={3} />
            <span className="text-sm font-bold">
              {user?.name || "Loading..."}
            </span>
          </div>

          <PsTooltip message="Keluar dari akun">
            <PsAlert
              label={
                <button className="hover:scale-110 transition-transform">
                  <PsSVG
                    name="log-out"
                    className="text-red-500"
                    strokeWidth={3}
                    size={24}
                  />
                </button>
              }
              title="Logout"
              description="Yakin ingin mengakhiri sesi ini?"
              onConfirm={handleLogout}
            />
          </PsTooltip>
        </div>
      </nav>

      <main className="p-8 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}
