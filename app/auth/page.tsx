"use client";

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function PsLoginPage() {
  const handleLogin = async () => {
    console.log("Hallo, World!");
  };

  return (
    <div className="grid h-screen w-full place-items-center bg-slate-50">
      <div className="w-full max-w-[400px] p-4">
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
            <Button className="w-full" onClick={handleLogin}>
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
