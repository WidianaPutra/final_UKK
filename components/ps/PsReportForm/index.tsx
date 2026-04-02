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
import PsSelect from "@/components/ps/PsSelect";
import PsTooltip from "@/components/ps/PsTooltip";
import PsSVG from "@/components/ps/PsSVG";
import { NativeSelectOption } from "@/components/ui/native-select";
import { cn } from "@/libs/utils";

type PsReportFormProps = {
  fullWidth?: boolean;
  categories: Array<{ id: number; name: string }>;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

function PsReportForm({
  fullWidth = false,
  categories,
  onSubmit,
}: PsReportFormProps) {
  return (
    <div className={cn(fullWidth ? "w-full" : "max-w-[450px]")}>
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Buat Laporan</CardTitle>
          <CardDescription>
            Sampaikan pengaduanmu dengan jelas dan sopan.
          </CardDescription>
        </CardHeader>

        <form onSubmit={onSubmit}>
          <CardContent className="flex flex-col gap-4">
            {/* Kategori */}
            <div className="grid gap-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="categoryId">Kategori</Label>
                <PsTooltip message="Pilih kategori yang paling sesuai dengan pengaduanmu.">
                  <span className="cursor-pointer text-muted-foreground">
                    <PsSVG name="tag" className="w-4 h-4" />
                  </span>
                </PsTooltip>
              </div>
              <PsSelect>
                <NativeSelectOption value="">
                  -- Pilih Kategori --
                </NativeSelectOption>
                {categories.map((cat) => (
                  <NativeSelectOption key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </NativeSelectOption>
                ))}
              </PsSelect>
            </div>

            {/* Pesan */}
            <div className="grid gap-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="message">Pesan Pengaduan</Label>
                <PsTooltip message="Jelaskan pengaduanmu secara detail agar mudah ditindaklanjuti.">
                  <span className="cursor-pointer text-muted-foreground">
                    <PsSVG name="pen" className="w-4 h-4" />
                  </span>
                </PsTooltip>
              </div>
              <Textarea
                id="message"
                name="message"
                placeholder="Tuliskan pengaduanmu di sini..."
                className="min-h-[120px] resize-none"
                required
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full">
              Kirim Laporan
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default PsReportForm;
