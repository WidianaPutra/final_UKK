"use client";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

import { useState, useEffect } from "react";

function PsSelect({
  children,
  name,
  defaultValue,
}: {
  children: React.ReactNode;
  name: string;
  defaultValue?: number;
}) {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setValue(defaultValue?.toString() ?? "");
  }, [defaultValue]);

  return (
    <div>
      <NativeSelect
        className="cursor-pointer"
        name={name}
        value={value}
        onChange={(e) => setValue(e?.target?.value)}
      >
        {children}
      </NativeSelect>
    </div>
  );
}

export default PsSelect;
