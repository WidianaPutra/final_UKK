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

export default function PsLoginPage() {
  return (
    <div className="max-w-[400px]">
      <Card>
        <CardHeader>
          <CardTitle className="text-center font-bold">Login</CardTitle>
          <CardDescription className="text-center">
            Login untuk masuk ke dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input placeholder="Email" id="email" type="email" />
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="/" className="text-sm hover:underline">
                  Forget password?
                </a>
              </div>
              <Input placeholder="Password" id="password" type="password" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Login</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
