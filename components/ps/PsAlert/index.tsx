import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type PsAlertProps = {
  label: React.ReactNode; // ReactNode agar bisa passing icon/element
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export function PsAlert({
  label,
  title,
  description,
  confirmText = "Hapus",
  cancelText = "Batal",
  onConfirm,
  onCancel,
}: PsAlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* label bisa berupa element apapun */}
        <div className="cursor-pointer">{label}</div>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" onClick={onCancel}>
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction
            className="cursor-pointer bg-red-500 hover:bg-red-600"
            onClick={onConfirm}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
