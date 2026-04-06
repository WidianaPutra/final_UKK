import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Class } from "@/app/generated/prisma/client";
import { z } from "zod";

const ClassSchema = z.object({
  className: z.string().min(1, "Nama kelas wajib diisi"),
});

// /api/class
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const search = searchParams.get("search");

    const classes = await prisma.class.findMany({
      where: search
        ? {
            className: {
              contains: search, // search logic
            },
          }
        : undefined,
      orderBy: { createdAt: "desc" },
      include: { students: { select: { id: true } } },
    });

    // total student/class
    const data = classes.map((c: Class, i) => ({
      ...c,
      totalStudents: i + 1,
      students: undefined, // buang raw relation dari response
    }));

    return NextResponse.json({ data, total: data.length }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mengambil data kelas", error },
      { status: 500 },
    );
  }
}

// /api/class
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ClassSchema.safeParse(body);

    console.log(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validasi gagal",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { className } = parsed.data;

    // afakah ada kelas yang terduplikat?
    const existing = await prisma.class.findFirst({
      where: { className },
    });
    if (existing) {
      return NextResponse.json(
        { message: `Kelas "${className}" sudah terdaftar` },
        { status: 409 },
      );
    }

    const newClass = await prisma.class.create({
      data: { className },
    });

    return NextResponse.json(
      { message: "Kelas berhasil ditambahkan", data: newClass },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menambahkan kelas", error },
      { status: 500 },
    );
  }
}
