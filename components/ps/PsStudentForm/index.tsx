"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { cn } from "@/libs/utils";
import { Class, Student } from "@/app/generated/prisma/client";
import { AdminView } from "@/types/AdminView";

type PsStudentFormProps = {
  fullWidth?: boolean;
  classes: Array<Class>;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsSection: React.Dispatch<React.SetStateAction<AdminView>>;
  status?: number;
  data?: Student | null;
};

function PsStudentForm({
  fullWidth = false,
  classes = [],
  onSubmit,
  setIsSection,
  status,
  data = null,
}: PsStudentFormProps) {
  const [selectedClass, setSelectedClass] = useState<number | undefined>(
    data?.classId,
  );

  useEffect(() => {
    if (data?.classId) {
      setSelectedClass(data.classId);
    }
  }, [data]);

  const getErrorMessage = () => {
    if (status === 409) return "NIS sudah ada. Gunakan nomor lain.";
    if (status === 400) return "Data yang dikirim tidak valid.";
    if (status && status >= 500) return "Terjadi kesalahan pada server.";
    return null;
  };

  return (
    <div className={cn(fullWidth ? "w-full" : "w-full max-w-[450px]")}>
      <Button
        variant="outline"
        className="my-3"
        onClick={() => setIsSection("table")}
      >
        Kembali
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="font-bold">
            {data ? "Edit Siswa" : "Tambah Siswa"}
          </CardTitle>
          <CardDescription>
            Isi data siswa dengan lengkap dan benar.
          </CardDescription>
        </CardHeader>

        <form onSubmit={onSubmit}>
          <CardContent className="flex flex-col gap-4">
            {/* NIS */}
            <div className="grid gap-2">
              <Label htmlFor="nis">NIS</Label>
              <Input
                id="nis"
                name="nis"
                type="number"
                placeholder="Nomor Induk Siswa"
                defaultValue={data?.nis}
                required
              />
            </div>

            {/* Nama */}
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Nama lengkap siswa"
                defaultValue={data?.name}
                required
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@sekolah.com"
                defaultValue={data?.email}
                required
              />
            </div>

            {/* Phone */}
            <div className="grid gap-2">
              <Label htmlFor="phone">No. Telepon</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="08xxxxxxxxxx"
                defaultValue={data?.phone}
                required
              />
            </div>

            {/* Birthday */}
            <div className="grid gap-2">
              <Label htmlFor="birthday">Tanggal Lahir</Label>
              <Input
                id="birthday"
                name="birthday"
                type="date"
                defaultValue={
                  data?.birthday
                    ? new Date(data.birthday).toISOString().slice(0, 10)
                    : ""
                }
                required
              />
            </div>

            {/* Class */}
            <div className="grid gap-2">
              <Label htmlFor="classId">Kelas</Label>
              <NativeSelect
                id="classId" // Tambahkan ID agar Label berfungsi
                className="cursor-pointer"
                name="classId" // Gunakan classId agar sesuai dengan schema Prisma umumnya
                value={selectedClass}
                onChange={(e) =>
                  setSelectedClass(parseInt(e.target.value as string, 10))
                }
                required
              >
                <NativeSelectOption value="">
                  -- Pilih Kelas --
                </NativeSelectOption>
                {classes?.map((c) => (
                  <NativeSelectOption key={c.id} value={c.id.toString()}>
                    {c.className}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>

            {getErrorMessage() && (
              <p className="text-xs font-medium text-red-500 bg-red-50 p-2 rounded">
                {getErrorMessage()}
              </p>
            )}
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full my-2">
              {data ? "Perbarui Siswa" : "Simpan Siswa"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default PsStudentForm;
