"use client";

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
import { cn } from "@/libs/utils";

type PsClassFormProps = {
  fullWidth?: boolean;
  status?: number | null;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsSection: (val: "table" | "new" | "edit") => void;
  data?: any | null;
};

function PsClassForm({
  fullWidth = false,
  status = null,
  onSubmit,
  setIsSection,
  data = null,
}: PsClassFormProps) {
  const getErrorMessage = () => {
    if (status === 409) return "Nama kelas sudah ada. Gunakan nama lain.";
    if (status === 400) return "Data yang dikirim tidak valid.";
    if (status && status >= 500) return "Terjadi kesalahan pada server.";
    return null;
  };

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
            {data ? "Edit Kelas" : "Tambah Kelas"}
          </CardTitle>
          <CardDescription>
            {data
              ? "Ubah nama kelas yang sudah ada."
              : "Buat grup kelas baru untuk siswa."}
          </CardDescription>
        </CardHeader>

        <form onSubmit={onSubmit} key={data?.id || "new-class"}>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="class">Nama Kelas</Label>
              <Input
                id="class"
                name="class"
                type="text"
                placeholder="Contoh: XII RPL 1"
                defaultValue={data?.className}
                required
              />

              {getErrorMessage() && (
                <p className="text-xs font-medium text-red-500">
                  {getErrorMessage()}
                </p>
              )}

              {(status === 200 || status === 201) && (
                <p className="text-xs font-medium text-green-600">
                  Data berhasil disimpan!
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full my-2">
              {data ? "Perbarui Kelas" : "Simpan Kelas"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default PsClassForm;
