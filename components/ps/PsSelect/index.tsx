import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

function PsSelect() {
  return (
    <div>
      <NativeSelect>
        <NativeSelectOption>Hadir</NativeSelectOption>
        <NativeSelectOption>Sakit</NativeSelectOption>
        <NativeSelectOption>Alpha</NativeSelectOption>
      </NativeSelect>
    </div>
  );
}

export default PsSelect;
