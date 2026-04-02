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
import PsSVG from "@/components/ps/PsSVG";
import { cn } from "@/libs/utils";

type PsAdminFormProps = {
  fullWidth?: boolean;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

function PsAdminForm({ fullWidth = false, onSubmit }: PsAdminFormProps) {
  return (
    <div className={cn(fullWidth ? "w-full" : "max-w-[450px]")}>
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Tambah Admin</CardTitle>
          <CardDescription>
            Isi data admin (guru) dengan lengkap dan benar.
          </CardDescription>
        </CardHeader>

        <form onSubmit={onSubmit}>
          <CardContent className="flex flex-col gap-4">
            {/* Nama */}
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Nama lengkap admin"
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
                placeholder="admin@sekolah.com"
                required
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="password">Password</Label>
                <PsTooltip message="Minimal 8 karakter, kombinasi huruf dan angka.">
                  <span className="cursor-pointer text-muted-foreground">
                    <PsSVG name="eye" className="w-4 h-4" />
                  </span>
                </PsTooltip>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
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
          </CardContent>

          <CardFooter className="py-2">
            <Button type="submit" className="w-full">
              Simpan Admin
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default PsAdminForm;
