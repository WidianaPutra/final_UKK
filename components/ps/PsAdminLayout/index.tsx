import PsSVG, { type SVGListTypes } from "../PsSVG";
import { Button } from "@/components/ui/button";
import PsTooltip from "../PsTooltip";
import { cn } from "@/libs/utils";

const sidebarMenuList: Array<{
  label: string;
  url: string;
  icon: SVGListTypes;
}> = [
  { label: "Home", url: "/admin", icon: "home" },
  { label: "Laporan", url: "/admin/laporan", icon: "list" },
  { label: "Siswa", url: "/admin/siswa", icon: "graduation-cap" },
  { label: "Admin", url: "/admin/admin", icon: "user" },
];

type PsAdminLayoutProps = {
  children: React.ReactNode;
  containClassName?: string;
};

function PsAdminLayout({ children, containClassName }: PsAdminLayoutProps) {
  return (
    <div className={cn("w-full min-h-screen flex")}>
      {/* Sidebar */}
      <div className="border-r-2 border-black w-[250px] min-h-screen flex flex-col bg-white relative">
        {/* Logo */}
        <div className="h-14 bg-black flex items-center justify-center">
          <h1 className="text-white text-[20px] font-bold tracking-widest">
            SMPS
          </h1>
        </div>

        {/* Task 2 & 4: Menu list using ShadCn Button */}
        <nav className="flex flex-col mt-2">
          {sidebarMenuList.map((menu) => (
            <Button
              key={menu.url}
              variant="ghost"
              asChild
              className="
                w-full justify-start gap-3
                bg-transparent text-black
                hover:bg-black hover:text-white
                rounded-none h-11 px-4 py-8
                font-medium text-2xl
                transition-colors duration-150
                border-b-2 border-black
              "
            >
              <a href={menu.url}>
                <PsSVG name={menu.icon} size={30} strokeWidth={2} />
                <span className="">{menu.label}</span>
              </a>
            </Button>
          ))}
        </nav>

        <div className="absolute bottom-10 left-0">
          <PsTooltip message="Logout">
            <PsSVG
              name="log-out"
              className="text-red-500 cursor-pointer"
              strokeWidth={2.5}
              size={30}
            />
          </PsTooltip>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* navigation bar */}
        <div className="h-14 bg-black flex justify-end items-center px-5 gap-2">
          <PsSVG name="user" className="text-white" strokeWidth={2.5} />
          <span className="text-white">I Nyoman Triadi Swastika</span>
        </div>

        {/* Page content */}
        <div className={cn("flex-1 bg-white", containClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default PsAdminLayout;
