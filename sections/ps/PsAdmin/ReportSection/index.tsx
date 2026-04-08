"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { AdminView } from "@/types/AdminView";
import PsReportForm from "@/components/ps/PsReportForm";
import PsReportTable from "@/sections/ps/PsTable/Report";
import PsReportView from "../../PsReportView";

export default function AdminReportSection() {
  const [isSection, setIsSection] = useState<AdminView>("table");
  const [idSelected, setIdSelected] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState<number>();

  useEffect(() => {
    if (!idSelected) {
      setSelectedData(null);
      return;
    }

    const getReportData = async () => {
      try {
        const res = await axios.get(`/api/report/${idSelected}`);
        setSelectedData(res.data?.data || res.data);
      } catch (err) {
        console.error("Failed to fetch report:", err);
      }
    };

    getReportData();
  }, [idSelected]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("/api/report-category");
        setCategories(res.data?.data || res.data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    getCategories();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const payload = {
        nis: parseInt(formData.get("nis") as string, 10),
        message: formData.get("message"),
        status: formData.get("status"),
        categoryId: parseInt(formData.get("categoryId") as string, 10),
      };

      const isEdit = isSection === "edit" && idSelected;
      const method = isEdit ? "PATCH" : "POST";
      const url = isEdit ? `/api/report/${idSelected}` : "/api/report";

      const a = await axios({ method, url, data: payload });

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
          <PsReportForm
            categories={categories}
            fullWidth={true}
            setIsSection={setIsSection}
            onSubmit={handleFormSubmit}
            status={status}
            data={isSection === "edit" ? selectedData : null}
          />
        );
      case "view":
        return <PsReportView data={selectedData} setIsSection={setIsSection} />;
      default:
        return (
          <PsReportTable
            setIsSection={setIsSection}
            setIdSelected={setIdSelected}
          />
        );
    }
  };

  return (
    <div className="w-full flex justify-center items-start p-4">
      {renderSection()}
    </div>
  );
}
