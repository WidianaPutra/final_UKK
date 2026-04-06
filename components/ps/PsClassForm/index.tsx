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
  type?: "CREATE" | "UPDATE";
  status?: number | null;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

function PsClassForm({
  fullWidth = false,
  type = "CREATE",
  status = null,
  onSubmit,
}: PsClassFormProps) {
  const getErrorMessage = () => {
    if (status === 409) return "Nama kelas sudah ada. Gunakan nama lain.";
    if (status === 400) return "Data yang dikirim tidak valid.";
    if (status && status >= 500) return "Terjadi kesalahan pada server.";
    return null;
  };
  return (
    <div className={cn(fullWidth ? "w-full" : "w-full max-w-[450px]")}>
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Tambah Kelas</CardTitle>
          <CardDescription>
            Isi data siswa dengan lengkap dan benar.
          </CardDescription>
        </CardHeader>

        <form onSubmit={onSubmit}>
          <CardContent className="flex flex-col gap-4">
            {/* Nama */}
            <div className="grid gap-2">
              <Label htmlFor="class">Nama Kelas</Label>
              <Input
                id="class"
                name="class"
                type="text"
                placeholder="Nama Kelas"
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
              Simpan Kelas
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default PsClassForm;
