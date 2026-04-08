"use client";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import PsLoginPage from "@/sections/ps/PsLogin";
// import PsTable from "@/components/ps/PsTable";
// import { PsAlert } from "@/components/ps/PsAlert";
// import PsDropdown from "@/components/ps/PsDropDown";
// import PsSelect from "@/components/ps/PsSelect";
// import PsTooltip from "@/components/ps/PsTooltip";
// import PsAdminLayout from "@/components/ps/PsAdminLayout";
// import { TableBody, TableCell, TableRow } from "@/components/ui/table";
// import { DropdownMenu } from "radix-ui";
// import { cn } from "@/libs/utils";
// import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
// import PsAdminForm from "@/components/ps/PsAdminForm";
// import PsStudentForm from "@/components/ps/PsStudentForm";
// import PsReportForm from "@/components/ps/PsReportForm";
// import PsReportTable from "@/sections/ps/PsTable/Report";
// import PsAdminTable from "@/sections/ps/PsTable/Admin";
// import PsStudentTable from "@/sections/ps/PsTable/Student";
// import PsClassForm from "@/components/ps/PsClassForm";
// import PsClassTable from "@/sections/ps/PsTable/Class";

// export default function Home() {
//   const menuItems = [
//     { label: "Edit", value: "edit" },
//     { label: "Hapus", value: "delete" },
//     { label: "Detail", value: "detail" },
//     { label: "Informasi", value: "detail" },
//   ];
//   return (
//     <div className=" p-4 min-h-[200vh]">
//       <PsLoginPage />
//       <PsAlert
//         label={<h1>Hallo, World</h1>}
//         description="testing cihuy"
//         title="AAAA"
//         cancelText="batal"
//         confirmText="yaa"
//         onCancel={() => console.log()}
//         onConfirm={() => console.log()}
//       />
//       <PsAdminForm />
//       <PsStudentForm classes={[{ id: "RPL1", name: "XII RPL 1" }]} />

//       <PsDropdown
//         label="Aksi"
//         variant="outline"
//         items={menuItems}
//         onSelect={(item) => console.log(item.value)}
//       />

//       {/* <PsSelect /> */}
//       <PsTooltip message="Testing">Acumalaka</PsTooltip>
//       <PsAdminLayout containClassName="py-5 px-5">
//         <h1 className="text-3xl font-extrabold pb-5">Home</h1>
//         <PsTable headerDatas={["No", "NIS"]}>
//           <TableBody>
//             <TableRow className={cn("")}>
//               <TableCell>1</TableCell>
//               <TableCell>1111</TableCell>
//             </TableRow>
//           </TableBody>
//         </PsTable>
//       </PsAdminLayout>

//       <br />
//       <br />
//       <PsReportTable />
//       <PsReportTable context="student" />
//       <PsAdminTable />
//       <PsStudentTable />
//       <PsClassTable />
//       <br />
//       <br />

//       <PsClassForm classes={[{ id: "RPL1", name: "XII RPL 1" }]} />
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PsStudentLayout from "@/components/ps/PsStudentLayout";
import PsReportForm from "@/components/ps/PsReportForm";
import PsStudentReportTable from "@/components/ps/PsStudentReportTable";
import PsReportView from "@/sections/ps/PsReportView"; // Sesuaikan pathnya
import { AdminView } from "@/types/AdminView";
import PsReportTable from "@/sections/ps/PsTable/Report";

export default function StudentPage() {
  const [isSection, setIsSection] = useState<AdminView>("table");
  const [idSelected, setIdSelected] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState<number>();

  // Ambil data detail laporan saat idSelected berubah (untuk Edit & View)
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

  // Ambil kategori untuk dropdown di form
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
      const isEdit = isSection === "edit" && idSelected;

      // Payload untuk student tidak perlu NIS (diambil dari session di BE)
      const payload = {
        message: formData.get("message"),
        categoryId: parseInt(formData.get("categoryId") as string, 10),
      };

      const method = isEdit ? "PATCH" : "POST";
      const url = isEdit ? `/api/report/${idSelected}` : "/api/report";

      await axios({ method, url, data: payload });

      // Reset state setelah berhasil
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
          <div className="max-w-2xl mx-auto w-full">
            <PsReportForm
              context="student"
              categories={categories}
              fullWidth={true}
              setIsSection={setIsSection}
              onSubmit={handleFormSubmit}
              status={status}
              data={isSection === "edit" ? selectedData : null}
            />
          </div>
        );
      case "view":
        return (
          <div className="max-w-3xl mx-auto w-full">
            <PsReportView data={selectedData} setIsSection={setIsSection} />
          </div>
        );
      default:
        return (
          <PsStudentReportTable
            setIsSection={setIsSection}
            setIdSelected={setIdSelected}
          />
        );
    }
  };

  return (
    <PsStudentLayout>
      <div className="animate-in fade-in duration-500 w-full flex justify-center items-start">
        {renderSection()}
      </div>
    </PsStudentLayout>
  );
}
