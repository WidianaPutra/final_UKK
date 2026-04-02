import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// ── Types ─────────────────────────────────────────────────────────────────────
export type PsDropdownItem = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

type PsDropdownProps = {
  label: string;
  items: PsDropdownItem[];
  onSelect?: (item: PsDropdownItem) => void;
  variant?: "outline" | "default" | "ghost" | "destructive" | "secondary";
  align?: "start" | "center" | "end";
  disabled?: boolean;
};

// ── Component ─────────────────────────────────────────────────────────────────
function PsDropdown({
  label,
  items,
  onSelect,
  variant = "outline",
  align = "start",
  disabled = false,
}: PsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button variant={variant}>{label}</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align}>
        <DropdownMenuGroup>
          {items.map((item) => (
            <DropdownMenuItem
              key={item.value}
              disabled={item.disabled}
              onSelect={() => onSelect?.(item)}
              className="cursor-pointer gap-2"
            >
              {item.icon && <span className="w-4 h-4">{item.icon}</span>}
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PsDropdown;
