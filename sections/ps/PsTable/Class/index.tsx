"use client";

export type DummyAdmin = {
  id: number;
  className: string;
  craetedAt: string;
};

export const dummyAdmins: DummyAdmin[] = [
  {
    id: 1,
    className: "XII RPL 1",
    craetedAt: "2026-03-01",
  },
  {
    id: 2,
    className: "XII RPL 1",
    craetedAt: "2026-03-01",
  },
  {
    id: 1,
    className: "XII RPL 1",
    craetedAt: "2026-03-01",
  },
  {
    id: 1,
    className: "XII RPL 1",
    craetedAt: "2026-03-01",
  },
];

import PsDropdown from "@/components/ps/PsDropDown";
import PsSVG from "@/components/ps/PsSVG";
import PsTable from "@/components/ps/PsTable";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/libs/utils";

export default function PsClassTable() {
  function handleDetail(id: number) {}

  function handleEdit(id: number) {}

  function handleDelete(id: number) {}

  return (
    <>
      <h1 className="text-3xl font-extrabold pb-5">Kelas</h1>

      <PsTable
        tableCaption="Data admin"
        headerDatas={["No", "Nama Kelas", "Dibuat", "Aksi"]}
      >
        <TableBody>
          {dummyAdmins.map((className, index) => (
            <TableRow
              key={index}
              className={cn(
                "transition-colors cursor-pointer",
                index % 2 === 0 ? "bg-white" : "bg-gray-50",
              )}
            >
              {/* No */}
              <TableCell className="text-sm text-gray-600 hidden md:table-cell">
                {index + 1}
              </TableCell>
              {/* Class name */}
              <TableCell className="text-sm text-gray-600 hidden md:table-cell">
                {className.className}
              </TableCell>

              {/* CreatedAt */}
              <TableCell className="text-sm text-gray-500">
                {new Date(className.craetedAt).toLocaleDateString("id-ID", {
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
                        onConfirm: () => handleDelete(className.id),
                      },
                    },
                  ]}
                  onSelect={(item) => {
                    if (item.value === "detail") handleDetail(className?.id);
                    if (item.value === "edit") handleEdit(className?.id);
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
