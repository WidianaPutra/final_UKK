import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { PsAlert } from "@/components/ps/PsAlert";

export type PsDropdownItemAlert = {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
};

export type PsDropdownItem = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  alert?: PsDropdownItemAlert;
};

type PsDropdownProps = {
  label: string;
  items: PsDropdownItem[];
  onSelect?: (item: PsDropdownItem) => void;
  variant?: "outline" | "default" | "ghost" | "destructive" | "secondary";
  align?: "start" | "center" | "end";
  disabled?: boolean;
};

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
          {items.map((item) =>
            // Jika item punya alert -> wrap dengan PsAlert
            item.alert ? (
              <DropdownMenuItem
                key={item.value}
                disabled={item.disabled}
                className="cursor-pointer gap-2 p-0 focus:bg-transparent"
                onSelect={(e) => e.preventDefault()}
              >
                <PsAlert
                  label={
                    <div className="flex items-center gap-2 w-full px-2 py-1.5 rounded-sm hover:bg-accent text-sm">
                      {item.icon && (
                        <span className="w-4 h-4">{item.icon}</span>
                      )}
                      {item.label}
                    </div>
                  }
                  title={item.alert.title}
                  description={item.alert.description}
                  confirmText={item.alert.confirmText}
                  cancelText={item.alert.cancelText}
                  onConfirm={item.alert.onConfirm}
                />
              </DropdownMenuItem>
            ) : (
              // Item biasa tanpa alert
              <DropdownMenuItem
                key={item.value}
                disabled={item.disabled}
                onSelect={() => onSelect?.(item)}
                className="cursor-pointer gap-2"
              >
                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                {item.label}
              </DropdownMenuItem>
            ),
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PsDropdown;
