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
import { NativeSelectOption } from "@/components/ui/native-select";
import { cn } from "@/libs/utils";
import { Class } from "@/app/generated/prisma/client";
import PsSelect from "@/components/ps/PsSelect";

type PsStudentFormProps = {
  fullWidth?: boolean;
  classes: Array<Class>;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

function PsStudentForm({
  fullWidth = false,
  classes = [],
  onSubmit,
}: PsStudentFormProps) {
  return (
    <div className={cn(fullWidth ? "w-full" : "w-full max-w-[450px]")}>
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Tambah Siswa</CardTitle>
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
                required
              />
            </div>

            {/* Birthday */}
            <div className="grid gap-2">
              <Label htmlFor="birthday">Tanggal Lahir</Label>
              <Input id="birthday" name="birthday" type="date" required />
            </div>

            {/* Class */}
            <div className="grid gap-2">
              <Label htmlFor="classId">Kelas</Label>
              <PsSelect name="classId">
                <NativeSelectOption value="">
                  -- Pilih Kelas --
                </NativeSelectOption>
                {classes.map((c) => (
                  <NativeSelectOption key={c.id} value={c.id}>
                    {c.className}
                  </NativeSelectOption>
                ))}
              </PsSelect>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full my-2">
              Simpan Siswa
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default PsStudentForm;
