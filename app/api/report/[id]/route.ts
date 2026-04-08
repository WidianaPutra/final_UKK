import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const report = await prisma.report.findUnique({
      where: { id },
      include: reportInclude,
    });

    if (!report) {
      return NextResponse.json(
        { message: "Laporan tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const body = await req.json();
    const { id } = await params;

    const validatedData = UpdateReportSchema.parse(body);

    console.log(body);

    const updatedReport = await prisma.report.update({
      where: { id },
      data: validatedData,
      include: reportInclude,
    });

    return NextResponse.json(updatedReport);
  } catch (error: any) {
    if (error.name === "ZodError")
      return NextResponse.json(error.errors, { status: 400 });
    return NextResponse.json({ message: "Gagal update" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const { id } = await params;

    await prisma.report.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Laporan berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ message: "Gagal menghapus" }, { status: 500 });
  }
}
