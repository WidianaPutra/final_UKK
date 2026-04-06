"use client";

export type DummyStudent = {
  id: string;
  nis: number;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  className: string;
};

export const dummyStudents: DummyStudent[] = [
  {
    id: "student-001",
    nis: 1111,
    name: "I Putu Surya Widiana Putra Cihuy",
    email: "surya@gmail.com",
    phone: "081234567891",
    birthday: "2007-03-15",
    className: "XII Rekayasa Perangkat Lunak 1",
  },
  {
    id: "student-002",
    nis: 1234,
    name: "RayaYou RayaYou",
    email: "jackcrimechan@gmail.com",
    phone: "089876543210",
    birthday: "2007-06-22",
    className: "XII Rekayasa Perangkat Lunak 1",
  },
  {
    id: "student-003",
    nis: 2222,
    name: "Reza Ladesh",
    email: "reza@gmail.com",
    phone: "082345678901",
    birthday: "2007-09-10",
    className: "XII Rekayasa Perangkat Lunak 1",
  },
  {
    id: "student-004",
    nis: 7158,
    name: "I Putu Surya Widiana Putra",
    email: "isuryawidianaputra@gmail.com",
    phone: "083456789012",
    birthday: "2007-01-30",
    className: "XII Rekayasa Perangkat Lunak 1",
  },
  {
    id: "student-005",
    nis: 9990,
    name: "I Gede Pande Maha Dana",
    email: "mahapande@gmail.com",
    phone: "084567890123",
    birthday: "2007-12-05",
    className: "XII Rekayasa Perangkat Lunak 1",
  },
];

import PsDropdown from "@/components/ps/PsDropDown";
import PsSVG from "@/components/ps/PsSVG";
import PsTable from "@/components/ps/PsTable";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/libs/utils";

export default function PsStudentTable() {
  function handleDetail(id: string) {}

  function handleEdit(id: string) {}

  function handleDelete(id: string) {}

  return (
    <>
      <h1 className="text-3xl font-extrabold pb-5">Siswa</h1>

      <PsTable
        tableCaption="Data siswa"
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
          {dummyStudents.map((student, index) => (
            <TableRow
              key={student.id}
              className={cn(
                "transition-colors cursor-pointer",
                index % 2 === 0 ? "bg-white" : "bg-gray-50",
              )}
            >
              {/* No */}
              <TableCell className="font-medium text-gray-500">
                {index + 1}
              </TableCell>

              {/* NIS */}
              <TableCell className="text-sm font-mono text-gray-600">
                {student.nis}
              </TableCell>

              {/* Nama */}
              <TableCell>
                <span className="font-semibold text-sm">{student.name}</span>
              </TableCell>

              {/* Email */}
              <TableCell className="text-sm text-gray-600 hidden md:table-cell">
                {student.email}
              </TableCell>

              {/* Phone */}
              <TableCell className="text-sm text-gray-600">
                {student.phone}
              </TableCell>

              {/* Birthday */}
              <TableCell className="text-sm text-gray-500">
                {new Date(student.birthday).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </TableCell>

              {/* Kelas */}
              <TableCell className="text-sm text-gray-600">
                {student.className}
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
                        onConfirm: () => handleDelete(student.id),
                      },
                    },
                  ]}
                  onSelect={(item) => {
                    if (item.value === "detail") handleDetail(student.id);
                    if (item.value === "edit") handleEdit(student.id);
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
