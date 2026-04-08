"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/auth", { username, password });

      if (res.data.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }

      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.message || "Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid h-screen w-full place-items-center bg-slate-50">
      <div className="w-full max-w-[400px] p-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center font-bold text-2xl">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-5">
              {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm border border-red-200">
                  {error}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  placeholder="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="text-xs text-muted-foreground hover:underline"
                  >
                    Lupa password?
                  </a>
                </div>
                <Input
                  placeholder="Password"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full font-semibold"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Mengecek Data..." : "Login Sekarang"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
