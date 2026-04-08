import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "secret");

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 },
      );
    }

    let user = null;
    let role: "STUDENT" | "ADMIN" | null = null;
    let userId = "";

    if (username.startsWith("student-")) {
      const nisStr = username.replace("student-", "");
      const nis = parseInt(nisStr, 10);

      if (isNaN(nis))
        return NextResponse.json(
          { message: "NIS tidak valid" },
          { status: 400 },
        );

      user = await prisma.student.findUnique({ where: { nis } });

      if (user && password === nisStr) {
        role = "STUDENT";
        userId = user.id;
      }
    } else if (username.startsWith("admin-")) {
      const email = username.replace("admin-", "");

      user = await prisma.admin.findUnique({ where: { email } });

      if (user && (await bcrypt.compare(password, user.password))) {
        role = "ADMIN";
        userId = user.id;
      }
    }

    if (!user || !role) {
      return NextResponse.json(
        { message: "Username atau Password salah" },
        { status: 401 },
      );
    }

    const token = await new SignJWT({ userId, role })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(JWT_SECRET);

    const response = NextResponse.json({
      message: "Login Berhasil",
      role: role,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("LOGIN_ERROR", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
