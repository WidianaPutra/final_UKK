"use client";

import {
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TableCaption,
} from "@/components/ui/table";
import { cn } from "@/libs/utils";
import PsAdminLayout from "@/components/ps/PsAdminLayout";
import PsTable from "@/components/ps/PsTable";
import PsDropdown from "@/components/ps/PsDropDown";
import PsTooltip from "@/components/ps/PsTooltip";
import PsSVG from "@/components/ps/PsSVG";

type ReportStatus = "WAITING" | "IN_PROGRESS" | "REJECTED" | "RESOLVED";

type Report = {
  id: string;
  student: { name: string; nis: number; className: string };
  category: { name: string };
  message: string;
  status: ReportStatus;
  createdAt: string;
};

const dummyReports: Report[] = [
  {
    id: "1",
    student: {
      name: "I Putu Surya Widiana",
      nis: 1111,
      className: "XII RPL 1",
    },
    category: { name: "Kerusakan Fasilitas" },
    message: "Kursi di lab komputer rusak dan tidak bisa dipakai.",
    status: "WAITING",
    createdAt: "2026-02-11",
  },
  {
    id: "2",
    student: { name: "RayaYou RayaYou", nis: 1234, className: "XII RPL 1" },
    category: { name: "Perundungan" },
    message: "Terjadi perundungan verbal di lingkungan kelas.",
    status: "IN_PROGRESS",
    createdAt: "2026-02-10",
  },
  {
    id: "3",
    student: {
      name: "I Gede Pande Maha Dana",
      nis: 9990,
      className: "XII RPL 1",
    },
    category: { name: "Kerusakan Fasilitas" },
    message: "Proyektor di ruang kelas tidak menyala.",
    status: "RESOLVED",
    createdAt: "2026-02-09",
  },
  {
    id: "4",
    student: { name: "Reza Ladesh", nis: 2222, className: "XII RPL 1" },
    category: { name: "Kerusakan Fasilitas" },
    message: "AC di ruang praktik bocor.",
    status: "REJECTED",
    createdAt: "2026-02-08",
  },
  {
    id: "5",
    student: {
      name: "I Putu Surya Widiana Putra",
      nis: 7158,
      className: "XII RPL 1",
    },
    category: { name: "Perundungan" },
    message: "Ada tindakan bullying fisik di kantin sekolah.",
    status: "WAITING",
    createdAt: "2026-02-07",
  },
];

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

export default function PsReportTable({
  context = "admin",
}: {
  context?: "student" | "admin";
}) {
  function handleDelete(id: string) {}
  function handleEdit(id: string) {}
  function handleDetail(id: string) {}
  return (
    <>
      <h1 className="text-3xl font-extrabold pb-5">Report</h1>

      <PsTable
        tableCaption="Data laporan"
        headerDatas={
          [
            "No",
            context == "admin" ? "Nama Siswa" : null,
            context == "admin" ? "Kelas" : null,
            "Kategori",
            "Pesan",
            "Status",
            "Tanggal",
            "aksi",
          ].filter(Boolean) as string[]
        }
      >
        <TableBody>
          {dummyReports.map((report, index) => (
            <TableRow
              key={report.id}
              className={cn(
                "transition-colors cursor-pointer",
                index % 2 === 0 ? "bg-white" : "bg-gray-50",
              )}
            >
              {/* No */}
              <TableCell className="font-medium text-gray-500">
                {index + 1}
              </TableCell>

              {/* Nama Siswa + NIS */}
              {context == "admin" && (
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">
                      {report.student.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      NIS: {report.student.nis}
                    </span>
                  </div>
                </TableCell>
              )}

              {/* Kelas */}
              {context == "admin" && (
                <TableCell className="text-sm text-gray-600">
                  {report.student.className}
                </TableCell>
              )}

              {/* Kategori */}
              <TableCell className="text-sm text-gray-600">
                {report.category.name}
              </TableCell>

              {/* Pesan truncate panjang */}
              <TableCell className="text-sm text-gray-600 max-w-[200px]">
                <PsTooltip message={report.message}>
                  <span className="truncate block cursor-default">
                    {report.message}
                  </span>
                </PsTooltip>
              </TableCell>

              {/* Status */}
              <TableCell>
                <StatusBadge status={report.status} />
              </TableCell>

              {/* Tanggal */}
              <TableCell className="text-sm text-gray-500">
                {report.createdAt}
              </TableCell>

              {/* Aksi */}
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
                        <PsSVG name="trash" className="w-4 h-4 text-red-500" />
                      ),
                      alert: {
                        title: "Hapus Laporan?",
                        description: `Laporan ini akan dihapus secara permanen dan tidak dapat dikembalikan.`,
                        confirmText: "Ya, Hapus",
                        cancelText: "Batal",
                        onConfirm: () => handleDelete(report.id),
                      },
                    },
                  ]}
                  onSelect={(item) => {
                    if (item.value === "detail") handleDetail(report.id);
                    if (item.value === "edit") handleEdit(report.id);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </PsTable>
    </>
  );
}
