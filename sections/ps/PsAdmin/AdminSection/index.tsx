"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { AdminView } from "@/types/AdminView";
import PsAdminForm from "@/components/ps/PsAdminForm";
import PsAdminTable from "../../PsTable/Admin";

export default function AdminSection() {
  const [isSection, setIsSection] = useState<AdminView>("table");
  const [idSelected, setIdSelected] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [status, setStatus] = useState<number>();

  useEffect(() => {
    if (isSection !== "edit" || !idSelected) {
      setSelectedData(null);
      return;
    }

    const getAdminDetail = async () => {
      try {
        const res = await axios.get(`/api/admin/${idSelected}`);
        setSelectedData(res.data?.data || res.data);
      } catch (err) {
        console.error("Failed to fetch admin detail:", err);
      }
    };

    getAdminDetail();
  }, [idSelected, isSection]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const isEdit = isSection === "edit" && idSelected;

      const payload: any = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        birthday: new Date(formData.get("birthday") as string).toISOString(),
      };

      const password = formData.get("password");
      if (password) payload.password = password;

      const method = isEdit ? "PATCH" : "POST";
      const url = isEdit ? `/api/admin/${idSelected}` : "/api/admin";

      await axios({ method, url, data: payload });

      // Riset de state de Clarve
      setIsSection("table");
      setIdSelected(null);
      setSelectedData(null);
      setStatus(undefined);
    } catch (err: any) {
      setStatus(err?.response?.status || 500);
    }
  };

  const renderSection = () => {
    switch (isSection) {
      case "new":
      case "edit":
        return (
          <PsAdminForm
            fullWidth
            setIsSection={setIsSection}
            onSubmit={handleFormSubmit}
            status={status}
            data={isSection === "edit" ? selectedData : null}
          />
        );
      default:
        return (
          <PsAdminTable
            setIsSection={setIsSection}
            setIdSelected={setIdSelected}
          />
        );
    }
  };

  return (
    <div className="w-full flex justify-center items-center p-4">
      {renderSection()}
    </div>
  );
}
