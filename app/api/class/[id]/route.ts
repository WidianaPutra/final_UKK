import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { z } from "zod";

type Params = { params: Promise<{ id: string }> };

// Zod Schemas
const ParamSchema = z.object({
  id: z.coerce
    .number("ID harus berupa angka")
    .int()
    .positive("ID harus berupa angka positif"),
});

const ClassUpdateSchema = z.object({
  className: z.string().min(1, "Nama kelas wajib diisi"),
});

async function parseId(params: Params["params"]) {
  const { id } = await params;
  return ParamSchema.safeParse({ id });
}

async function findClassOrNull(id: number) {
  return prisma.class.findUnique({
    where: { id },
    include: { students: { select: { id: true, name: true, nis: true } } },
  });
}

export async function GET(_req: NextRequest, params: Params) {
  try {
    const parsed = await parseId(params.params);
    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "ID tidak valid",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const classData = await findClassOrNull(parsed.data.id);
    if (!classData) {
      return NextResponse.json(
        { message: "Kelas tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        data: {
          ...classData,
          totalStudents: classData.students.length,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mengambil data kelas", error },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest, params: Params) {
  try {
    // Validasi id
    const parsedId = await parseId(params.params);
    if (!parsedId.success) {
      return NextResponse.json(
        {
          message: "ID tidak valid",
          errors: parsedId.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // Validasi body
    const body = await req.json();
    const parsedBody = ClassUpdateSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: "Validasi gagal",
          errors: parsedBody.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // Cek exist
    const existing = await findClassOrNull(parsedId.data.id);
    if (!existing) {
      return NextResponse.json(
        { message: "Kelas tidak ditemukan" },
        { status: 404 },
      );
    }

    const duplicate = await prisma.class.findFirst({
      where: {
        className: parsedBody.data.className,
        NOT: { id: parsedId.data.id },
      },
    });
    if (duplicate) {
      return NextResponse.json(
        { message: `Kelas "${parsedBody.data.className}" sudah terdaftar` },
        { status: 409 },
      );
    }

    const updated = await prisma.class.update({
      where: { id: parsedId.data.id },
      data: { className: parsedBody.data.className },
    });

    return NextResponse.json(
      { message: "Kelas berhasil diperbarui", data: updated },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal memperbarui kelas", error },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: NextRequest, params: Params) {
  try {
    // Validasi id
    const parsedId = await parseId(params.params);
    if (!parsedId.success) {
      return NextResponse.json(
        {
          message: "ID tidak valid",
          errors: parsedId.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // Cek exist
    const existing = await findClassOrNull(parsedId.data.id);
    if (!existing) {
      return NextResponse.json(
        { message: "Kelas tidak ditemukan" },
        { status: 404 },
      );
    }

    if (existing.students.length > 0) {
      return NextResponse.json(
        {
          message: `Kelas tidak dapat dihapus karena masih memiliki ${existing.students.length} siswa`,
        },
        { status: 409 },
      );
    }

    await prisma.class.delete({ where: { id: parsedId.data.id } });

    return NextResponse.json(
      { message: "Kelas berhasil dihapus" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menghapus kelas", error },
      { status: 500 },
    );
  }
}
