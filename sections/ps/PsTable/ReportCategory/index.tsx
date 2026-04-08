"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PsDropdown from "@/components/ps/PsDropDown";
import PsSVG from "@/components/ps/PsSVG";
import PsTable from "@/components/ps/PsTable";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/libs/utils";

export default function PsCategoryTable({ setIsSection, setIdSelected }: any) {
  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/report-category");
      setCategories(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/report-category/${id}`);
      fetchCategories();
    } catch (err) {
      alert("Gagal menghapus kategori.");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center pb-5">
        <h1 className="text-3xl font-extrabold">Kategori Laporan</h1>
        <Button onClick={() => setIsSection("new")}>Tambah Kategori</Button>
      </div>

      <PsTable
        tableCaption="Manajemen kategori pengaduan"
        headerDatas={["No", "Nama Kategori", "Total Laporan", "Aksi"]}
      >
        <TableBody>
          {categories.map((cat, index) => (
            <TableRow
              key={cat.id}
              className={cn(index % 2 === 0 ? "bg-white" : "bg-gray-50")}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-bold">{cat.name}</TableCell>
              <TableCell>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                  {cat._count?.reports || 0} Laporan
                </span>
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
                        title: "Hapus Kategori?",
                        description:
                          "Menghapus kategori mungkin berdampak pada data laporan yang sudah ada.",
                        onConfirm: () => handleDelete(cat.id),
                      },
                    },
                  ]}
                  onSelect={(item) => {
                    if (item.value === "edit") {
                      setIdSelected(cat.id);
                      setIsSection("edit");
                    }
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
