// @/libs/zod-schema.ts
import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { jwtVerify } from "jose";

export const ReportSchema = z.object({
  message: z.string().min(1, "Pesan tidak boleh kosong"),
  studentId: z.string().cuid("ID Siswa tidak valid"),
  categoryId: z.number().int(),
  adminId: z.string().cuid().optional(),
  status: z.enum(["WAITING", "IN_PROGRESS", "REJECTED", "RESOLVED"]).optional(),
});

export const UpdateReportSchema = ReportSchema.partial();

const reportInclude = {
  admin: true,
  category: true,
  student: {
    include: {
      class: true,
    },
  },
};

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "secret");

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = payload.userId as string;
    const role = payload.role as string;

    const whereCondition = role === "STUDENT" ? { studentId: userId } : {};

    const reports = await prisma.report.findMany({
      where: whereCondition,
      include: reportInclude,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: reports }, { status: 200 });
  } catch (error: any) {
    console.error("GET_REPORTS_ERROR:", error);

    if (error.code === "ERR_JWT_EXPIRED") {
      return NextResponse.json({ message: "Session Expired" }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userRole = payload.role as string;
    const userIdFromToken = payload.userId as string;

    const body = await req.json();
    let targetStudentId = "";

    if (userRole === "STUDENT") {
      targetStudentId = userIdFromToken;
    } else if (userRole === "ADMIN") {
      const inputNis = body.nis || body.studentId;

      if (!inputNis) {
        return NextResponse.json(
          { message: "NIS Siswa wajib diisi" },
          { status: 400 },
        );
      }

      const student = await prisma.student.findUnique({
        where: { nis: parseInt(inputNis as string, 10) },
      });

      if (!student) {
        return NextResponse.json(
          { message: "Siswa dengan NIS tersebut tidak ditemukan" },
          { status: 404 },
        );
      }

      targetStudentId = student.id;
    }

    const newReport = await prisma.report.create({
      data: {
        message: body.message,
        categoryId: parseInt(body.categoryId),
        studentId: targetStudentId,
        status: "WAITING",
      },
      include: {
        category: true,
        student: true,
      },
    });

    return NextResponse.json(newReport, { status: 201 });
  } catch (error: any) {
    console.error("REPORT_CREATE_ERROR:", error);
    return NextResponse.json(
      { message: "Gagal membuat laporan" },
      { status: 500 },
    );
  }
}
