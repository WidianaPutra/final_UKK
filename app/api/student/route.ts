import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { z } from "zod";

const StudentSchema = z.object({
  nis: z.number().int().positive("NIS harus berupa angka positif"),
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().min(8, "No. telepon minimal 8 karakter"),
  birthday: z.string().datetime("Format tanggal tidak valid"),
  className: z.string().min(1, "Kelas wajib diisi"),
});

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: students }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mengambil data siswa", error },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validasi
    const parsed = StudentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validasi gagal",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { nis, name, email, phone, birthday, className } = parsed.data;

    // Cek duplikat NIS
    const existingNis = await prisma.student.findUnique({ where: { nis } });
    if (existingNis) {
      return NextResponse.json(
        { message: `NIS ${nis} sudah terdaftar` },
        { status: 409 },
      );
    }

    const student = await prisma.student.create({
      data: {
        nis,
        name,
        email,
        phone,
        birthday: new Date(birthday),
        className,
      },
    });

    return NextResponse.json(
      { message: "Siswa berhasil ditambahkan", data: student },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menambahkan siswa", error },
      { status: 500 },
    );
  }
}
