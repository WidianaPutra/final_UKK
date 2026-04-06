"use client";
import PsAdminLayout from "@/components/ps/PsAdminLayout";
import PsAdminTable from "@/sections/ps/PsTable/Admin";
import PsReportTable from "@/sections/ps/PsTable/Report";
import PsStudentTable from "@/sections/ps/PsTable/Student";
import { useSearchParams } from "next/navigation";

export default function AdminPage() {
  const params = useSearchParams();
  const sec = params.get("sec");

  const sections: Record<string, React.ReactNode> = {
    laporan: <PsReportTable />,
    siswa: <PsStudentTable />,
    admin: <PsAdminTable />,
  };

  return (
    <PsAdminLayout containClassName="py-5 px-5">
      {sections[sec as string] || (
        <>
          <PsReportTable />
          <PsAdminTable />
          <PsStudentTable />
        </>
      )}
    </PsAdminLayout>
  );
}
