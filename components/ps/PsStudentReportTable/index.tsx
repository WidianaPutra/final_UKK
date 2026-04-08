"use client";

import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { cn } from "@/libs/utils";
import PsTable from "@/components/ps/PsTable";
import PsDropdown from "@/components/ps/PsDropDown";
import PsTooltip from "@/components/ps/PsTooltip";
import PsSVG from "@/components/ps/PsSVG";
import PsSelect from "@/components/ps/PsSelect";
import { NativeSelectOption } from "@/components/ui/native-select";
import { Button } from "@/components/ui/button";
import { SetStateAction, useEffect, useState } from "react";
import { AdminView } from "@/types/AdminView";
import {
  Class,
  ReportCategories,
  Student,
} from "@/app/generated/prisma/client";
import axios from "axios";

type ReportStatus = "WAITING" | "IN_PROGRESS" | "REJECTED" | "RESOLVED";

type Report = {
  id: string;
  student: { name: string; nis: number; className: string };
  category: { name: string };
  message: string;
  status: ReportStatus;
  createdAt: string;
};

const statusConfig: Record<ReportStatus, { label: string; className: string }> =
  {
    WAITING: {
      label: "Menunggu",
      className: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    },
    IN_PROGRESS: {
      label: "Diproses",
      className: "bg-blue-100   text-blue-700   border border-blue-300",
    },
    RESOLVED: {
      label: "Diselesaikan",
      className: "bg-green-100  text-green-700  border border-green-300",
    },
    REJECTED: {
      label: "Ditolak",
      className: "bg-red-100    text-red-700    border border-red-300",
    },
  };

function StatusBadge({ status }: { status: ReportStatus }) {
  const { label, className } = statusConfig[status];
  return (
    <span
      className={cn("text-xs font-medium px-2 py-1 rounded-full", className)}
    >
      {label}
    </span>
  );
}

type DataType = Report & { category: ReportCategories } & {
  student: Student & { class: Class };
};

export default function PsReportTable({
  context = "admin",
  setIsSection,
  setIdSelected,
}: {
  context?: "student" | "admin";
  setIsSection: React.Dispatch<SetStateAction<AdminView>>;
  setIdSelected: React.Dispatch<SetStateAction<string | null>>;
}) {
  const [rawData, setRawData] = useState<Array<DataType>>([]);
  const [displayData, setDisplayData] = useState<Array<DataType>>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("ALL");

  const getReportData = async () => {
    try {
      const res = await axios.get("/api/report");
      const fetchedData = res.data?.data || [];
      setRawData(fetchedData);
      setDisplayData(fetchedData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getReportData();
  }, []);

  const handleFilterChange = (status: string) => {
    setCurrentFilter(status);
    if (status === "ALL") {
      setDisplayData(rawData);
    } else {
      const filtered = rawData.filter((item) => item.status === status);
      setDisplayData(filtered);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
    }).format(new Date(dateStr));
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/report/${id}`);

      const updatedRaw = rawData.filter((item) => item.id !== id);
      setRawData(updatedRaw);

      if (currentFilter === "ALL") {
        setDisplayData(updatedRaw);
      } else {
        const updatedDisplay = updatedRaw.filter(
          (item) => item.status === currentFilter,
        );
        setDisplayData(updatedDisplay);
      }
    } catch (err) {
      console.error("Gagal menghapus laporan:", err);
      alert("Terjadi kesalahan saat mencoba menghapus data.");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center mb-5">
        <h1 className="text-3xl font-extrabold">Report</h1>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Filter:</span>
            <div onChange={(e: any) => handleFilterChange(e.target.value)}>
              <PsSelect name="filterStatus">
                <NativeSelectOption value="ALL">
                  Semua Status
                </NativeSelectOption>
                <NativeSelectOption value="WAITING">
                  Menunggu
                </NativeSelectOption>
                <NativeSelectOption value="IN_PROGRESS">
                  Diproses
                </NativeSelectOption>
                <NativeSelectOption value="RESOLVED">
                  Selesai
                </NativeSelectOption>
                <NativeSelectOption value="REJECTED">
                  Ditolak
                </NativeSelectOption>
              </PsSelect>
            </div>
          </div>

          <Button onClick={() => setIsSection("new")}>Tambah Laporan</Button>
        </div>
      </div>

      <PsTable
        tableCaption={
          currentFilter === "ALL"
            ? "Semua data laporan"
            : `Data laporan dengan status ${currentFilter}`
        }
        headerDatas={
          ["No", "Kategori", "Pesan", "Status", "Tanggal", "Aksi"].filter(
            Boolean,
          ) as string[]
        }
      >
        <TableBody>
          {displayData?.length > 0 ? (
            displayData.map((report: DataType, index) => (
              <TableRow
                key={report.id}
                className={cn(
                  "transition-colors cursor-pointer",
                  index % 2 === 0 ? "bg-white" : "bg-gray-50",
                )}
              >
                <TableCell className="font-medium text-gray-500">
                  {index + 1}
                </TableCell>

                <TableCell className="text-sm text-gray-600">
                  {report.category.name}
                </TableCell>

                <TableCell className="text-sm text-gray-600 max-w-[200px]">
                  <PsTooltip message={report.message}>
                    <span className="truncate block">{report.message}</span>
                  </PsTooltip>
                </TableCell>

                <TableCell>
                  <StatusBadge status={report.status} />
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {formatDate(report.createdAt)}
                </TableCell>

                <TableCell>
                  <PsDropdown
                    label="Aksi"
                    align="end"
                    items={[
                      {
                        label: "Detail",
                        value: "detail",
                        icon: <PsSVG name="eye" className="w-4 h-4" />,
                      },
                      {
                        label: "Edit",
                        value: "edit",
                        icon: (
                          <PsSVG name="pen" className="w-4 h-4 text-blue-500" />
                        ),
                      },
                      {
                        label: "Hapus",
                        value: "delete",
                        icon: (
                          <PsSVG
                            name="trash"
                            className="w-4 h-4 text-red-500"
                          />
                        ),
                        alert: {
                          title: "Hapus Laporan?",
                          description: `Laporan ini akan dihapus secara permanen.`,
                          confirmText: "Ya, Hapus",
                          onConfirm: () => handleDelete(report.id),
                        },
                      },
                    ]}
                    onSelect={(item) => {
                      if (item.value === "detail") {
                        setIsSection("view");
                        setIdSelected(report.id);
                      }
                      if (item.value === "edit") {
                        setIsSection("edit");
                        setIdSelected(report.id);
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center py-10 text-gray-400 italic"
              >
                Tidak ada data dengan status ini.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </PsTable>
    </div>
  );
}
