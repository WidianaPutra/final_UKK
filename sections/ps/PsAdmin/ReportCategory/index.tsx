"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PsCategoryTable from "../../PsTable/ReportCategory";
import PsCategoryForm from "@/components/ps/PsReportCategoryForm";

export default function AdminReportCategorySection() {
  const [isSection, setIsSection] = useState<"table" | "new" | "edit">("table");
  const [idSelected, setIdSelected] = useState<number | null>(null);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  useEffect(() => {
    if (isSection !== "edit" || !idSelected) {
      setSelectedData(null);
      return;
    }

    const getCategoryDetail = async () => {
      try {
        const res = await axios.get(`/api/report-category/${idSelected}`);
        setSelectedData(res.data?.data || res.data);
      } catch (err) {
        console.error("Gagal mengambil detail kategori", err);
      }
    };

    getCategoryDetail();
  }, [idSelected, isSection]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setStatus(null);

    try {
      const isEdit = isSection === "edit" && idSelected;
      const payload = { name: formData.get("name") };

      const method = isEdit ? "PATCH" : "POST";
      const url = isEdit
        ? `/api/report-category/${idSelected}`
        : "/api/report-category";

      const res = await axios({ method, url, data: payload });
      setStatus(res.status);

      setTimeout(() => {
        setIsSection("table");
        setIdSelected(null);
        setStatus(null);
      }, 1000);
    } catch (err: any) {
      setStatus(err?.response?.status || 500);
    }
  };

  return (
    <div className="w-full flex justify-center items-start p-4">
      <div className="w-full">
        {isSection === "table" ? (
          <PsCategoryTable
            setIsSection={setIsSection}
            setIdSelected={setIdSelected}
          />
        ) : (
          <PsCategoryForm
            fullWidth={true}
            setIsSection={setIsSection}
            onSubmit={handleFormSubmit}
            status={status}
            data={isSection === "edit" ? selectedData : null}
          />
        )}
      </div>
    </div>
  );
}
