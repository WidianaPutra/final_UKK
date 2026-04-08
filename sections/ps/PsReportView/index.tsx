// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import {
//   MessageSquare,
//   Calendar,
//   User,
//   Tag,
//   ArrowLeft,
//   UserCheck,
// } from "lucide-react";
// import { cn } from "@/libs/utils";
// import {
//   Report,
//   Student,
//   Class,
//   ReportCategories,
//   Admin,
// } from "@/app/generated/prisma/client";
// import { AdminView } from "@/types/AdminView";

// type DataType = Report & { category: ReportCategories } & {
//   student: Student & { class: Class };
// };

// type PsReportViewProps = {
//   data: DataType | null;
//   setIsSection: React.Dispatch<React.SetStateAction<AdminView>>;
// };

// const statusConfig = {
//   WAITING: {
//     label: "Menunggu",
//     className: "bg-yellow-100 text-yellow-700 border-yellow-200",
//   },
//   APPROVED: {
//     label: "Disetujui",
//     className: "bg-green-100 text-green-700 border-green-200",
//   },
//   REJECTED: {
//     label: "Ditolak",
//     className: "bg-red-100 text-red-700 border-red-200",
//   },
// };

// function StatusBadge({ status }: { status: keyof typeof statusConfig }) {
//   const { label, className } = statusConfig[status];
//   return (
//     <span
//       className={cn(
//         "text-xs font-semibold px-2.5 py-0.5 rounded-full border",
//         className,
//       )}
//     >
//       {label}
//     </span>
//   );
// }

// function PsReportView({ data, setIsSection }: PsReportViewProps) {
//   if (!data) return null;

//   const formatDate = (date: Date) => {
//     return new Intl.DateTimeFormat("id-ID", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     }).format(new Date(date));
//   };

//   return (
//     <div className="w-full max-w-[600px] space-y-4">
//       <Button
//         variant="ghost"
//         onClick={() => setIsSection("table")}
//         className="group"
//       >
//         <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
//         Kembali ke Daftar Laporan
//       </Button>

//       <Card className="shadow-lg border-slate-200">
//         <CardHeader className="border-b bg-slate-50/50">
//           <div className="flex justify-between items-start">
//             <div className="space-y-1">
//               <CardTitle className="text-xl font-bold">
//                 Detail Laporan
//               </CardTitle>
//               <CardDescription>ID Laporan: {data.id}</CardDescription>
//             </div>
//             <StatusBadge status={data.status as keyof typeof statusConfig} />
//           </div>
//         </CardHeader>

//         <CardContent className="pt-6 space-y-6">
//           <div className="space-y-3">
//             <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
//               <Tag size={16} />
//               <span>KATEGORI: {data.category?.name}</span>
//             </div>
//             <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
//               <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
//                 "{data.message}"
//               </p>
//             </div>
//             <div className="flex items-center gap-2 text-xs text-muted-foreground">
//               <Calendar size={14} />
//               <span>Dikirim pada {formatDate(data.createdAt)}</span>
//             </div>
//           </div>

//           <Separator />

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-3">
//               <h4 className="text-sm font-bold flex items-center gap-2">
//                 <User size={16} className="text-primary" /> Informasi Pelapor
//               </h4>
//               <div className="text-sm space-y-1">
//                 <p className="font-medium">{data.student?.name}</p>
//                 <p className="text-muted-foreground">
//                   NIS: {data.student?.nis}
//                 </p>
//                 <p className="text-muted-foreground">
//                   Kelas: {data.student?.class?.className}
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-3">
//               <h4 className="text-sm font-bold flex items-center gap-2">
//                 <UserCheck size={16} className="text-primary" /> Admin Penangan
//               </h4>
//               <div className="text-sm">
//                 {data.admin ? (
//                   <p className="font-medium text-slate-700">
//                     {data.admin.name}
//                   </p>
//                 ) : (
//                   <p className="text-slate-400 italic font-light italic">
//                     Belum ditangani admin
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </CardContent>

//         <CardFooter className="bg-slate-50/50 border-t p-4 flex gap-3">
//           <Button
//             variant="default"
//             className="flex-1"
//             onClick={() => setIsSection("new")}
//           >
//             Tanggapi / Edit
//           </Button>
//           <Button
//             variant="outline"
//             className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
//           >
//             Hapus Laporan
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

// export default PsReportView;

import {
  Class,
  ReportCategories,
  Student,
} from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/libs/utils";
import { AdminView } from "@/types/AdminView";

type DataType = Report & { category?: ReportCategories } & {
  student?: Student & { class?: Class };
};

type ReportStatus = "WAITING" | "IN_PROGRESS" | "REJECTED" | "RESOLVED";

const statusConfig: Record<ReportStatus, { label: string; className: string }> =
  {
    WAITING: {
      label: "Menunggu",
      className: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    },
    IN_PROGRESS: {
      label: "Diproses",
      className: "bg-blue-100   text-blue-700   border border-blue-300",
    },
    RESOLVED: {
      label: "Diselesaikan",
      className: "bg-green-100  text-green-700  border border-green-300",
    },
    REJECTED: {
      label: "Ditolak",
      className: "bg-red-100    text-red-700    border border-red-300",
    },
  };

function StatusBadge({ status }: { status: ReportStatus }) {
  const { label, className } = statusConfig[status];
  return (
    <span
      className={cn("text-xs font-medium px-2 py-1 rounded-full", className)}
    >
      {label}
    </span>
  );
}

export default function PsReportView({
  data,
  setIsSection,
}: {
  data: any;
  setIsSection: React.Dispatch<React.SetStateAction<AdminView>>;
}) {
  const dateForamt = (a?: string | Date | null) => {
    if (!a) return "";
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(a));
  };
  return (
    <div className="w-full">
      <Button className="my-5" onClick={() => setIsSection("table")}>
        Kembali
      </Button>
      <Card className="shadow-lg border-slate-200">
        <CardHeader className="border-b bg-slate-50/50">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold">
                Detail Laporan
              </CardTitle>
              <CardDescription>Nama: {data?.student?.name}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
              <span>KATEGORI: {data?.category?.name}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                "{data?.message}"
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Dikirim pada: {dateForamt(data?.createdAt)} </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-sm font-bold flex items-center gap-2"></h4>
              <div className="text-sm space-y-1">
                <p className="font-medium"></p>
                <p className="text-muted-foreground">
                  NIS: {data?.student?.nis}
                </p>
                <p className="text-muted-foreground">
                  Kelas: {data?.student?.class?.className}
                </p>
                <p>
                  Status: {<StatusBadge status={data?.status ?? "WAITING"} />}
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-slate-50/50 border-t p-4 flex gap-3">
          {/* <Button
            variant="default"
            className="flex-1"
            onClick={() => setIsSection("new")}
          >
            Tanggapi / Edit
          </Button>
          <Button
            variant="outline"
            className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
          >
            Hapus Laporan
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}
