import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params; // id = report id

    const report = await prisma.report.findUnique({
      where: { id },
      include: { student: true },
    });

    if (!report) {
      return NextResponse.json(
        { message: "Laporan tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: report.student }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mengambil data siswa dari laporan", error },
      { status: 500 },
    );
  }
}
