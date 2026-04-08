"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PsDropdown from "@/components/ps/PsDropDown";
import PsSVG from "@/components/ps/PsSVG";
import PsTable from "@/components/ps/PsTable";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/libs/utils";

export default function PsClassTable({
  setIsSection,
  setIdSelected,
}: {
  setIsSection: (val: "table" | "new" | "edit") => void;
  setIdSelected: (id: number | null) => void;
}) {
  const [classes, setClasses] = useState<any[]>([]);

  const fetchClasses = async () => {
    try {
      const res = await axios.get("/api/class");
      setClasses(res.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/class/${id}`);
      fetchClasses();
    } catch (err) {
      alert("Gagal menghapus kelas. Pastikan kelas tidak memiliki siswa.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center pb-5">
        <h1 className="text-3xl font-extrabold">Kelas</h1>
        <Button onClick={() => setIsSection("new")}>Tambah Kelas</Button>
      </div>

      <PsTable
        tableCaption="Daftar kelas yang tersedia"
        headerDatas={["No", "Nama Kelas", "Dibuat", "Aksi"]}
      >
        <TableBody>
          {classes.map((cls, index) => (
            <TableRow
              key={cls.id}
              className={cn(index % 2 === 0 ? "bg-white" : "bg-gray-50")}
            >
              <TableCell className="text-sm font-medium">{index + 1}</TableCell>
              <TableCell className="text-sm font-bold">
                {cls.className}
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {new Date(cls.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                <PsDropdown
                  label="Aksi"
                  align="end"
                  items={[
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
                        title: "Hapus Kelas?",
                        description: `Data kelas ${cls.className} akan dihapus permanen.`,
                        confirmText: "Ya, Hapus",
                        onConfirm: () => handleDelete(cls.id),
                      },
                    },
                  ]}
                  onSelect={(item) => {
                    if (item.value === "edit") {
                      setIdSelected(cls.id);
                      setIsSection("edit");
                    }
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
