"use client";

import { Class, Student } from "@/app/generated/prisma/client";
import PsDropdown from "@/components/ps/PsDropDown";
import PsSVG from "@/components/ps/PsSVG";
import PsTable from "@/components/ps/PsTable";
import PsSelect from "@/components/ps/PsSelect";
import { NativeSelectOption } from "@/components/ui/native-select";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/libs/utils";
import { AdminView } from "@/types/AdminView";
import axios from "axios";
import { SetStateAction, useState, useEffect } from "react";

type StudentWithClass = Student & { class: Class };

export default function PsStudentTable({
  setIsSection,
  setIdSelected,
}: {
  setIsSection: React.Dispatch<SetStateAction<AdminView>>;
  setIdSelected: React.Dispatch<SetStateAction<string | null>>;
}) {
  const [rawData, setRawData] = useState<Array<StudentWithClass>>([]);
  const [displayData, setDisplayData] = useState<Array<StudentWithClass>>([]);
  const [classList, setClassList] = useState<Array<Class>>([]);

  const [currentClassId, setCurrentClassId] = useState<string>("ALL");

  const handleGetInitialData = async () => {
    try {
      const [studentRes, classRes] = await Promise.all([
        axios.get("/api/student"),
        axios.get("/api/class"),
      ]);

      const students = studentRes.data?.data || [];
      setRawData(students);
      setDisplayData(students);
      setClassList(classRes.data?.data || []);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    }
  };

  useEffect(() => {
    handleGetInitialData();
  }, []);

  const handleFilterChange = (classId: string) => {
    setCurrentClassId(classId);
    if (classId === "ALL") {
      setDisplayData(rawData);
    } else {
      const filtered = rawData.filter(
        (student) => student.classId.toString() === classId,
      );
      setDisplayData(filtered);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/student/${id}`);
      const updatedRaw = rawData.filter((s) => s.id !== id);
      setRawData(updatedRaw);

      if (currentClassId === "ALL") {
        setDisplayData(updatedRaw);
      } else {
        setDisplayData(
          updatedRaw.filter((s) => s.classId.toString() === currentClassId),
        );
      }
    } catch (err) {
      console.error("Gagal menghapus:", err);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center mb-5">
        <h1 className="text-3xl font-extrabold">Siswa</h1>

        <div className="flex gap-4 items-center">
          {/* Filter Kelas */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Kelas:</span>
            <div onChange={(e: any) => handleFilterChange(e.target.value)}>
              <PsSelect name="filterClass">
                <NativeSelectOption value="ALL">Semua Kelas</NativeSelectOption>
                {classList.map((c) => (
                  <NativeSelectOption key={c.id} value={c.id.toString()}>
                    {c.className}
                  </NativeSelectOption>
                ))}
              </PsSelect>
            </div>
          </div>

          <Button onClick={() => setIsSection("new")}>Tambah Siswa</Button>
        </div>
      </div>

      <PsTable
        tableCaption="Data siswa terdaftar"
        headerDatas={[
          "No",
          "NIS",
          "Nama",
          "Email",
          "No. Telepon",
          "Tanggal Lahir",
          "Kelas",
          "Aksi",
        ]}
      >
        <TableBody>
          {displayData.length > 0 ? (
            displayData.map((student, index) => (
              <TableRow
                key={student.id}
                className={cn(
                  "transition-colors cursor-pointer",
                  index % 2 === 0 ? "bg-white" : "bg-gray-50",
                )}
              >
                <TableCell className="font-medium text-gray-500">
                  {index + 1}
                </TableCell>
                <TableCell className="text-sm font-mono text-gray-600">
                  {student.nis}
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-sm">{student.name}</span>
                </TableCell>
                <TableCell className="text-sm text-gray-600 hidden md:table-cell">
                  {student.email}
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {student.phone}
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {new Date(student.birthday).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {student?.class?.className}
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
                          <PsSVG
                            name="trash"
                            className="w-4 h-4 text-red-500"
                          />
                        ),
                        alert: {
                          title: "Hapus Siswa?",
                          description: `Data siswa ${student.name} akan dihapus permanen.`,
                          confirmText: "Ya, Hapus",
                          onConfirm: () => handleDelete(student.id),
                        },
                      },
                    ]}
                    onSelect={(item) => {
                      if (item.value === "edit") {
                        setIsSection("edit");
                        setIdSelected(student?.id);
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
                Tidak ada siswa di kelas ini.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </PsTable>
    </div>
  );
}
