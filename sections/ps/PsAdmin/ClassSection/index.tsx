"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PsClassTable from "../../PsTable/Class";
import PsClassForm from "@/components/ps/PsClassForm";

export default function AdminClassSection() {
  const [isSection, setIsSection] = useState<"table" | "new" | "edit">("table");
  const [idSelected, setIdSelected] = useState<number | null>(null);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  useEffect(() => {
    if (isSection !== "edit" || !idSelected) {
      setSelectedData(null);
      return;
    }

    const getClassDetail = async () => {
      try {
        const res = await axios.get(`/api/class/${idSelected}`);
        setSelectedData(res.data?.data || res.data);
      } catch (err) {
        console.error("Gagal mengambil detail kelas", err);
      }
    };

    getClassDetail();
  }, [idSelected, isSection]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setStatus(null);

    try {
      const isEdit = isSection === "edit" && idSelected;
      const payload = {
        className: formData.get("class"),
      };

      const method = isEdit ? "PATCH" : "POST";
      const url = isEdit ? `/api/class/${idSelected}` : "/api/class";

      const res = await axios({ method, url, data: payload });
      setStatus(res.status);

      setTimeout(() => {
        setIsSection("table");
        setIdSelected(null);
        setSelectedData(null);
        setStatus(null);
      }, 1000);
    } catch (err: any) {
      setStatus(err?.response?.status || 500);
    }
  };

  return (
    <div className="w-full flex justify-center items-start p-4">
      <div className="w-full ">
        {isSection === "table" ? (
          <PsClassTable
            setIsSection={setIsSection}
            setIdSelected={setIdSelected}
          />
        ) : (
          <PsClassForm
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
