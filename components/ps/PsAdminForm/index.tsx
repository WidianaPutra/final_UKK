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
import PsTooltip from "@/components/ps/PsTooltip";
import { cn } from "@/libs/utils";
import { AdminView } from "@/types/AdminView";

type PsAdminFormProps = {
  fullWidth?: boolean;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsSection: (val: AdminView) => void;
  status?: number;
  data?: any | null;
};

function PsAdminForm({
  fullWidth = false,
  onSubmit,
  setIsSection,
  status,
  data = null,
}: PsAdminFormProps) {
  const formattedBirthday = data?.birthday
    ? new Date(data.birthday).toISOString().split("T")[0]
    : "";

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
            {data ? "Edit Data Admin" : "Tambah Admin"}
          </CardTitle>
          <CardDescription>
            Isi data admin (guru) dengan lengkap dan benar.
          </CardDescription>
        </CardHeader>

        <form onSubmit={onSubmit} key={data?.id || "new"}>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                name="name"
                defaultValue={data?.name}
                placeholder="Nama lengkap admin"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={data?.email}
                placeholder="admin@sekolah.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="password">
                  Password{" "}
                  {data && (
                    <span className="text-[10px] text-muted-foreground font-normal">
                      (Kosongkan jika tidak diubah)
                    </span>
                  )}
                </Label>
                <PsTooltip message="Minimal 8 karakter.">
                  <span className="cursor-pointer text-muted-foreground"></span>
                </PsTooltip>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required={!data}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">No. Telepon</Label>
              <Input
                id="phone"
                name="phone"
                defaultValue={data?.phone}
                placeholder="08xxxxxxxxxx"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="birthday">Tanggal Lahir</Label>
              <Input
                id="birthday"
                name="birthday"
                type="date"
                defaultValue={formattedBirthday}
                required
              />
            </div>

            {status && status >= 400 && (
              <p className="text-xs text-red-500 bg-red-50 p-2 rounded">
                Gagal menyimpan data. Periksa kembali input Anda.
              </p>
            )}
          </CardContent>

          <CardFooter className="py-2">
            <Button type="submit" className="w-full">
              {data ? "Perbarui Admin" : "Simpan Admin"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default PsAdminForm;
