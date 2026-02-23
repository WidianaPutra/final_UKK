import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PsLoginPage from "@/sections/ps/PsLogin";
import PsTable from "@/sections/ps/PsTable";
import { PsAlert } from "@/components/ps/PsAlert";
import PsDropdown from "@/components/ps/PsDropDown";
import PsSelect from "@/components/ps/PsSelect";
import PsTooltip from "@/components/ps/PsTooltip";

export default function Home() {
  return (
    <div className="max-w-[400px] p-4 min-h-[200vh]">
      <PsLoginPage />
      <br />
      <PsTable />
      <br />
      <PsAlert />
      <br />
      <br />
      <PsDropdown />
      <br />
      <br />
      <PsSelect />
      <br />
      <br />
      <PsTooltip />
    </div>
  );
}
