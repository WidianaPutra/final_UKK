"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { cn } from "@/libs/utils";
import { ReportCategories } from "@/app/generated/prisma/client";
import { SetStateAction } from "react";
import { AdminView } from "@/types/AdminView";

const STATUS_OPTIONS = [
  { id: "WAITING", label: "Menunggu..." },
  { id: "IN_PROGRESS", label: "Sedang Diproses" },
  { id: "REJECTED", label: "Ditolak" },
  { id: "RESOLVED", label: "Selesai" },
];

interface ReportData {
  id?: string;
  message: string;
  categoryId: number;
  studentId?: string;
  status?: "WAITING" | "IN_PROGRESS" | "REJECTED" | "RESOLVED";
}

type ReportForm = {
  fullWidth: boolean;
  categories: ReportCategories[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
  setIsSection: React.Dispatch<SetStateAction<AdminView>>;
  status: number | undefined;
  data?: ReportData | null;
  context?: "admin" | "student";
};

export default function PsReportForm({
  fullWidth = false,
  categories = [],
  onSubmit,
  setIsSection,
  status,
  data = null,
  context = "admin",
}: ReportForm) {
  const formKey = data?.id || "new-form";

  return (
    <div className={cn(fullWidth ? "w-full" : "w-full max-w-[450px]")}>
      <Button
        variant="outline"
        className="mb-4"
        onClick={() => setIsSection("table")}
      >
        Kembali
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="font-bold">
            {data ? "Edit Laporan" : "Buat Laporan"}
          </CardTitle>
          <CardDescription>
            {data
              ? `Update status atau pesan laporan.`
              : "Sampaikan pengaduanmu."}
          </CardDescription>
        </CardHeader>

        <form onSubmit={onSubmit} key={formKey}>
          <CardContent className="flex flex-col gap-4">
            {!data && context == "admin" && (
              <div className="grid gap-2">
                <Label htmlFor="nis">NIS (Nomor Induk Siswa)</Label>
                <Input
                  id="nis"
                  name="nis"
                  type="number"
                  placeholder="Masukkan NIS Anda..."
                  required
                />
              </div>
            )}

            {data && context == "admin" && (
              <div className="grid gap-2 p-3 border rounded-md bg-blue-50/50 border-blue-100">
                <Label htmlFor="status" className="text-blue-700 font-semibold">
                  Update Status Laporan
                </Label>
                <NativeSelect
                  id="status"
                  name="status"
                  defaultValue={data?.status}
                  className="bg-white border-blue-200"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <NativeSelectOption key={opt.id} value={opt.id}>
                      {opt.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="categoryId">Kategori</Label>
              <NativeSelect
                id="categoryId"
                name="categoryId"
                defaultValue={data?.categoryId?.toString() || ""}
                required
              >
                <NativeSelectOption value="" disabled>
                  -- Pilih Kategori --
                </NativeSelectOption>
                {categories.map((cat: any) => (
                  <NativeSelectOption key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">Pesan Pengaduan</Label>
              <Textarea
                id="message"
                name="message"
                defaultValue={data?.message}
                className="min-h-[120px] resize-none"
                required
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full">
              {data ? "Simpan Perubahan" : "Kirim Laporan"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
