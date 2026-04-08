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

export default function PsCategoryForm({
  fullWidth,
  status,
  onSubmit,
  setIsSection,
  data,
}: any) {
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
            {data ? "Edit Kategori" : "Tambah Kategori"}
          </CardTitle>
          <CardDescription>
            Gunakan nama kategori yang spesifik (misal: Sarana Prasarana).
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Kategori</Label>
              <Input
                id="name"
                name="name"
                defaultValue={data?.name}
                placeholder="Nama Kategori"
                required
              />
              {status === 409 && (
                <p className="text-xs text-red-500">Nama kategori sudah ada.</p>
              )}
              {status === 201 ||
                (status === 200 && (
                  <p className="text-xs text-green-600">Berhasil disimpan!</p>
                ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {data ? "Perbarui" : "Simpan"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
