"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PsTable from "@/components/ps/PsTable";
import PsDropdown from "@/components/ps/PsDropDown";
import PsSVG from "@/components/ps/PsSVG";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/libs/utils";

export default function StudentReportSection({
  setIsSection,
  setIdSelected,
}: any) {
  const [reports, setReports] = useState<any[]>([]);

  const fetchMyReports = async () => {
    const res = await axios.get("/api/report");
    setReports(res.data.data);
  };

  useEffect(() => {
    fetchMyReports();
  }, []);

  const statusStyle: any = {
    WAITING: "bg-amber-100 text-amber-700 border-amber-300",
    IN_PROGRESS: "bg-blue-100 text-blue-700 border-blue-300",
    RESOLVED: "bg-green-100 text-green-700 border-green-300",
    REJECTED: "bg-red-100 text-red-700 border-red-300",
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter">
            Laporan Saya
          </h2>
          <p className="text-gray-500 font-medium">
            Pantau status pengaduan yang telah kamu kirim.
          </p>
        </div>
        <Button
          className="bg-black hover:bg-zinc-800 text-white font-bold h-12 px-6 rounded-none border-r-4 border-b-4 border-zinc-600 active:border-0"
          onClick={() => setIsSection("new")}
        >
          <PsSVG name="eye" size={20} className="mr-2" />
          Buat Laporan Baru
        </Button>
      </div>

      <PsTable
        headerDatas={["No", "Kategori", "Status", "Tanggal", "Aksi"]}
        tableCaption="Riwayat pengaduan pribadi"
      >
        <TableBody>
          {reports.map((item, index) => (
            <TableRow
              key={item.id}
              className="hover:bg-white transition-colors group"
            >
              <TableCell className="font-black text-gray-400">
                {(index + 1).toString().padStart(2, "0")}
              </TableCell>
              <TableCell className="font-bold text-lg">
                {item.category.name}
              </TableCell>
              <TableCell>
                <span
                  className={cn(
                    "px-3 py-1 rounded-md border-2 font-black text-[10px] uppercase",
                    statusStyle[item.status],
                  )}
                >
                  {item.status}
                </span>
              </TableCell>
              <TableCell className="text-gray-500 font-medium">
                {new Date(item.createdAt).toLocaleDateString("id-ID")}
              </TableCell>
              <TableCell>
                <PsDropdown
                  label="Manage"
                  items={[
                    {
                      label: "Lihat Detil",
                      value: "view",
                      icon: <PsSVG name="eye" size={16} />,
                    },
                    {
                      label: "Edit Laporan",
                      value: "edit",
                      icon: <PsSVG name="pen" size={16} />,
                    },
                    {
                      label: "Tarik Laporan",
                      value: "delete",
                      icon: (
                        <PsSVG
                          name="trash"
                          size={16}
                          className="text-red-500"
                        />
                      ),
                      alert: {
                        title: "Batalkan Laporan?",
                        description:
                          "Laporan yang ditarik akan dihapus permanen.",
                        onConfirm: () => {
                          /* fungsi delete sama seperti sebelumnya */
                        },
                      },
                    },
                  ]}
                  onSelect={(val) => {
                    setIdSelected(item.id);
                    setIsSection(val.value);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </PsTable>
    </div>
  );
}
