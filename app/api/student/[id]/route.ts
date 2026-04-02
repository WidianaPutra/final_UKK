import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { z } from "zod";

type Params = { params: Promise<{ id: string }> };

const StudentUpdateSchema = z
  .object({
    nis: z.number().int().positive().optional(),
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(8).optional(),
    birthday: z.string().datetime().optional(),
    className: z.string().min(1).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Minimal satu field harus diisi untuk update",
  });

async function findStudentOrThrow(id: string) {
  const student = await prisma.student.findUnique({ where: { id } });
  if (!student) return null;
  return student;
}

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const student = await findStudentOrThrow(id);
    if (!student) {
      return NextResponse.json(
        { message: "Siswa tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: student }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mengambil data siswa", error },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Validasi
    const parsed = StudentUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validasi gagal",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // Cek exist
    const existing = await findStudentOrThrow(id);
    if (!existing) {
      return NextResponse.json(
        { message: "Siswa tidak ditemukan" },
        { status: 404 },
      );
    }

    // Cek NIS duplikat jika NIS di-update
    if (parsed.data.nis && parsed.data.nis !== existing.nis) {
      const nisConflict = await prisma.student.findUnique({
        where: { nis: parsed.data.nis },
      });
      if (nisConflict) {
        return NextResponse.json(
          { message: `NIS ${parsed.data.nis} sudah digunakan` },
          { status: 409 },
        );
      }
    }

    const { birthday, ...rest } = parsed.data;

    const updated = await prisma.student.update({
      where: { id },
      data: {
        ...rest,
        ...(birthday && { birthday: new Date(birthday) }),
      },
    });

    return NextResponse.json(
      { message: "Data siswa berhasil diperbarui", data: updated },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal memperbarui data siswa", error },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const existing = await findStudentOrThrow(id);
    if (!existing) {
      return NextResponse.json(
        { message: "Siswa tidak ditemukan" },
        { status: 404 },
      );
    }

    await prisma.student.delete({ where: { id } });

    return NextResponse.json(
      { message: "Siswa berhasil dihapus" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menghapus siswa", error },
      { status: 500 },
    );
  }
}
