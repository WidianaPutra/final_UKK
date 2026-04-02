import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

function PsSelect({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NativeSelect className="cursor-pointer">{children}</NativeSelect>
    </div>
  );
}

export default PsSelect;
