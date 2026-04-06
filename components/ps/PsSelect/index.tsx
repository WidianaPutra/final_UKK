import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

function PsSelect({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  return (
    <div>
      <NativeSelect className="cursor-pointer" name={name}>
        {children}
      </NativeSelect>
    </div>
  );
}

export default PsSelect;
