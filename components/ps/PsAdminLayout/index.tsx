"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PsSVG, { type SVGListTypes } from "../PsSVG";
import { Button } from "@/components/ui/button";
import PsTooltip from "../PsTooltip";
import { cn } from "@/libs/utils";
import { PsAlert } from "../PsAlert";

const sidebarMenuList: Array<{
  label: string;
  url: string;
  icon: SVGListTypes;
}> = [
  { label: "Home", url: "/admin", icon: "home" },
  { label: "Laporan", url: "/admin?sec=laporan", icon: "list" },
  { label: "Siswa", url: "/admin?sec=siswa", icon: "graduation-cap" },
  { label: "Admin", url: "/admin?sec=admin", icon: "user" },
  { label: "Class", url: "/admin?sec=class", icon: "book-open-text" },
  { label: "Kategori", url: "/admin?sec=category", icon: "layers" },
];

type PsAdminLayoutProps = {
  children: React.ReactNode;
  containClassName?: string;
};

function PsAdminLayout({ children, containClassName }: PsAdminLayoutProps) {
  const [adminName, setAdminName] = useState<string>("Loading...");

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const res = await axios.get("/api/me");
        setAdminName(res.data.data.name);
      } catch (err) {
        console.error("Gagal memuat profil:", err);
        window.location.href = "/auth";
      }
    };

    fetchAdminProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      window.location.href = "/auth";
    } catch (err) {
      console.error("Gagal logout:", err);
    }
  };

  return (
    <div className={cn("w-full min-h-screen flex")}>
      {/* Sidebar */}
      <div className="border-r-2 border-black w-[250px] min-h-screen flex flex-col bg-white relative">
        <div className="h-14 bg-gray-50 flex items-center justify-center">
          <h1 className="text-black text-[20px] font-bold tracking-widest">
            SMPS
          </h1>
        </div>

        <nav className="flex flex-col mt-2">
          {sidebarMenuList.map((menu) => (
            <Button
              key={menu.url}
              variant="ghost"
              asChild
              className="
                w-full justify-start gap-3
                bg-transparent text-black
                hover:bg-black hover:text-white
                rounded-none h-11 px-4 py-8
                font-medium text-2xl
                transition-colors duration-150
                border-b-2 border-black
              "
            >
              <a href={menu.url}>
                <PsSVG name={menu.icon} size={30} strokeWidth={2} />
                <span className="">{menu.label}</span>
              </a>
            </Button>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col min-h-screen">
        <div className="h-14 bg-gray-50 flex justify-end items-center px-5 gap-4">
          <div className="flex gap-2 items-center">
            <PsSVG
              name="user"
              className="text-black"
              strokeWidth={3}
              size={20}
            />
            <span className="text-black font-semibold text-sm">
              {adminName}
            </span>
          </div>

          <PsTooltip message="Log out">
            <PsAlert
              label={
                <div className="cursor-pointer">
                  <PsSVG
                    name="log-out"
                    className="text-red-500"
                    strokeWidth={3}
                    size={25}
                  />
                </div>
              }
              title="Logout"
              description="Apakah yakin ingin keluar dari sistem?"
              cancelText="Batal"
              confirmText="Log out"
              onConfirm={handleLogout}
            ></PsAlert>
          </PsTooltip>
        </div>

        <div className={cn("flex-1 bg-white", containClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default PsAdminLayout;
