import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [report, student, admin, sClass, reportCategory] = await Promise.all([
      prisma.report.count(),
      prisma.student.count(),
      prisma.admin.count(),
      prisma.class.count(),
      prisma.reportCategories.count(),
    ]);

    return NextResponse.json({
      data: {
        report,
        student,
        admin,
        class: sClass,
        reportCategory,
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
