"use client";
import { useState } from "react";
import PsClassForm from "@/components/ps/PsClassForm";
import axios from "axios";

export default function ClassFormPage() {
  const [status, setStatus] = useState<number | null>(null);
  const handleNewClass = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await axios.post("/api/class", {
        className: new FormData(e.currentTarget).get("class"),
      });

      const responseStatus = response?.status ?? null;
      setStatus(responseStatus);
    } catch (err: any) {
      setStatus(err?.response?.status ?? 0);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <PsClassForm
        onSubmit={handleNewClass}
        status={status}
        fullWidth={false}
      />
    </div>
  );
}
