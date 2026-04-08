import { useState, useEffect } from "react";
import { Student, Class } from "@/app/generated/prisma/client";
import { AdminView } from "@/types/AdminView";
import axios from "axios";
import PsStudentForm from "@/components/ps/PsStudentForm";
import PsStudentTable from "@/sections/ps/PsTable/Student";

export default function AdminStudentSection() {
  const [isSection, setIsSection] = useState<AdminView>("table");
  const [idSelected, setIdSelected] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<Student | null>(null);
  const [classes, setClasses] = useState<Array<Class>>([]);
  const [status, setStatus] = useState<number>();

  useEffect(() => {
    if (!idSelected) {
      setSelectedData(null);
      return;
    }

    const getStudentData = async () => {
      try {
        const res = await axios.get(`/api/student/${idSelected}`);
        setSelectedData(res.data?.data || null);
      } catch (err) {
        console.error("Failed to fetch student:", err);
      }
    };

    getStudentData();
  }, [idSelected]);

  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await axios.get("/api/class");
        setClasses(res.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch classes:", err);
      }
    };
    getClasses();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const payload = {
        nis: parseInt(formData.get("nis") as string, 10),
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        classId: parseInt(formData.get("classId") as string, 10),
        birthday: formData.get("birthday")
          ? new Date(formData.get("birthday") as string).toISOString()
          : null,
      };

      const isEdit = isSection === "edit";
      const method = isEdit ? "PATCH" : "POST";
      const url = isEdit ? `/api/student/${idSelected}` : "/api/student";

      await axios({ method, url, data: payload });

      setIsSection("table");
      setIdSelected(null);
      setIsSection("table");
    } catch (err: any) {
      setStatus(err?.response?.status);
    }
  };

  const renderSection = () => {
    switch (isSection) {
      case "edit":
        return (
          <PsStudentForm
            classes={classes}
            fullWidth={true}
            setIsSection={setIsSection}
            onSubmit={handleFormSubmit}
            status={status}
            data={isSection === "edit" ? selectedData : null}
          />
        );
      case "table":
        return (
          <PsStudentTable
            setIsSection={setIsSection}
            setIdSelected={setIdSelected}
          />
        );
      default:
        return (
          <PsStudentForm
            classes={classes}
            fullWidth={true}
            setIsSection={setIsSection}
            onSubmit={handleFormSubmit}
            status={status}
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
