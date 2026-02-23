import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
  CardAction,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PsLoginPage from "@/sections/ps/PsLogin";
import PsTable from "@/sections/ps/PsTable";
import { PsAlert } from "@/components/ps/PsAlert";

export default function Home() {
  return (
    <div className="max-w-[400px] p-4">
      <PsLoginPage />
      <br />
      <PsTable />
      <br />
      <PsAlert />
    </div>
  );
}
