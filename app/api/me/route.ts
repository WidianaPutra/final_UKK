import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "secret");

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Sesi telah berakhir, silakan login kembali" },
        { status: 401 },
      );
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = payload.userId as string;
    const role = payload.role as "ADMIN" | "STUDENT";

    let userData = null;

    if (role === "ADMIN") {
      userData = await prisma.admin.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          birthday: true,
          createdAt: true,
        },
      });
    } else if (role === "STUDENT") {
      userData = await prisma.student.findUnique({
        where: { id: userId },
        include: {
          class: true,
        },
      });

      if (userData) {
        const { password, ...studentWithoutPassword } = userData as any;
        userData = studentWithoutPassword;
      }
    }

    if (!userData) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        data: userData,
        role: role,
      },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("GET_ME_ERROR:", err);

    if (err.code === "ERR_JWT_EXPIRED") {
      return NextResponse.json(
        { message: "Token kadaluarsa" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
