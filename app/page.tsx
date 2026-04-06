"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PsLoginPage from "@/sections/ps/PsLogin";
import PsTable from "@/components/ps/PsTable";
import { PsAlert } from "@/components/ps/PsAlert";
import PsDropdown from "@/components/ps/PsDropDown";
import PsSelect from "@/components/ps/PsSelect";
import PsTooltip from "@/components/ps/PsTooltip";
import PsAdminLayout from "@/components/ps/PsAdminLayout";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DropdownMenu } from "radix-ui";
import { cn } from "@/libs/utils";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import PsAdminForm from "@/components/ps/PsAdminForm";
import PsStudentForm from "@/components/ps/PsStudentForm";
import PsReportForm from "@/components/ps/PsReportForm";
import PsReportTable from "@/sections/ps/PsTable/Report";
import PsAdminTable from "@/sections/ps/PsTable/Admin";
import PsStudentTable from "@/sections/ps/PsTable/Student";
import PsClassForm from "@/components/ps/PsClassForm";
import PsClassTable from "@/sections/ps/PsTable/Class";

export default function Home() {
  const menuItems = [
    { label: "Edit", value: "edit" },
    { label: "Hapus", value: "delete" },
    { label: "Detail", value: "detail" },
    { label: "Informasi", value: "detail" },
  ];
  return (
    <div className=" p-4 min-h-[200vh]">
      <PsLoginPage />
      <PsAlert
        label={<h1>Hallo, World</h1>}
        description="testing cihuy"
        title="AAAA"
        cancelText="batal"
        confirmText="yaa"
        onCancel={() => console.log()}
        onConfirm={() => console.log()}
      />
      <PsAdminForm />
      <PsStudentForm classes={[{ id: "RPL1", name: "XII RPL 1" }]} />

      <PsDropdown
        label="Aksi"
        variant="outline"
        items={menuItems}
        onSelect={(item) => console.log(item.value)}
      />

      {/* <PsSelect /> */}
      <PsTooltip message="Testing">Acumalaka</PsTooltip>
      <PsAdminLayout containClassName="py-5 px-5">
        <h1 className="text-3xl font-extrabold pb-5">Home</h1>
        <PsTable headerDatas={["No", "NIS"]}>
          <TableBody>
            <TableRow className={cn("")}>
              <TableCell>1</TableCell>
              <TableCell>1111</TableCell>
            </TableRow>
          </TableBody>
        </PsTable>
      </PsAdminLayout>

      <br />
      <br />
      <PsReportTable />
      <PsReportTable context="student" />
      <PsAdminTable />
      <PsStudentTable />
      <PsClassTable />
      <br />
      <br />

      <PsClassForm classes={[{ id: "RPL1", name: "XII RPL 1" }]} />
    </div>
  );
}
