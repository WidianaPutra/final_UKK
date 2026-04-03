"use client";

export type DummyAdmin = {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  createdAt: string;
};

export const dummyAdmins: DummyAdmin[] = [
  {
    id: "admin-001",
    name: "Ni Komang Ayu Prasetya Dewi",
    email: "ayu@sekolah.com",
    phone: "081234567890",
    birthday: "1985-03-12",
    createdAt: "2026-01-10",
  },
  {
    id: "admin-002",
    name: "Putu Arista Adiguna Arsa",
    email: "arista@sekolah.com",
    phone: "082345678901",
    birthday: "1990-07-24",
    createdAt: "2026-01-15",
  },
  {
    id: "admin-003",
    name: "I Made Suardana",
    email: "suardana@sekolah.com",
    phone: "083456789012",
    birthday: "1988-11-05",
    createdAt: "2026-02-01",
  },
  {
    id: "admin-004",
    name: "Ni Wayan Rika Antari",
    email: "rika@sekolah.com",
    phone: "084567890123",
    birthday: "1992-04-18",
    createdAt: "2026-02-14",
  },
  {
    id: "admin-005",
    name: "I Nyoman Bayu Prasetyo",
    email: "bayu@sekolah.com",
    phone: "085678901234",
    birthday: "1987-09-30",
    createdAt: "2026-03-01",
  },
];

import PsDropdown from "@/components/ps/PsDropDown";
import PsSVG from "@/components/ps/PsSVG";
import PsTable from "@/components/ps/PsTable";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/libs/utils";

export default function PsAdminTable() {
  function handleDetail(id: string) {}

  function handleEdit(id: string) {}

  function handleDelete(id: string) {}

  return (
    <>
      <h1 className="text-3xl font-extrabold pb-5">Admin</h1>

      <PsTable
        headerDatas={[
          "No",
          "Nama",
          "Email",
          "No. Telepon",
          "Tanggal Lahir",
          "Bergabung",
          "Aksi",
        ]}
      >
        <TableBody>
          {dummyAdmins.map((admin, index) => (
            <TableRow
              key={admin.id}
              className={cn(
                "transition-colors cursor-pointer",
                index % 2 === 0 ? "bg-white" : "bg-gray-50",
              )}
            >
              {/* No */}
              <TableCell className="font-medium text-gray-500">
                {index + 1}
              </TableCell>

              {/* Nama + Email (mobile fallback) */}
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{admin.name}</span>
                  <span className="text-xs text-gray-400 md:hidden">
                    {admin.email}
                  </span>
                </div>
              </TableCell>

              {/* Email */}
              <TableCell className="text-sm text-gray-600 hidden md:table-cell">
                {admin.email}
              </TableCell>

              {/* Phone */}
              <TableCell className="text-sm text-gray-600">
                {admin.phone}
              </TableCell>

              {/* Birthday */}
              <TableCell className="text-sm text-gray-500">
                {new Date(admin.birthday).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </TableCell>

              {/* CreatedAt */}
              <TableCell className="text-sm text-gray-500">
                {new Date(admin.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
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
                        onConfirm: () => handleDelete(admin.id),
                      },
                    },
                  ]}
                  onSelect={(item) => {
                    if (item.value === "detail") handleDetail(admin?.id);
                    if (item.value === "edit") handleEdit(admin?.id);
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
