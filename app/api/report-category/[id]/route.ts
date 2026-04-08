import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export const CategorySchema = z.object({
  name: z.string().min(1, "Nama kategori tidak boleh kosong").max(50),
});

const UpdateCategorySchema = CategorySchema.partial();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const category = await prisma.reportCategories.findUnique({
      where: { id: parseInt(id) },
      include: { reports: true },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Kategori tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const validatedData = UpdateCategorySchema.parse(body);
    const { id } = await params;

    const updatedCategory = await prisma.reportCategories.update({
      where: { id: parseInt(id) },
      data: validatedData,
    });

    return NextResponse.json(updatedCategory);
  } catch (error: any) {
    if (error.name === "ZodError")
      return NextResponse.json(error.errors, { status: 400 });
    return NextResponse.json(
      { message: "Gagal memperbarui kategori" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    await prisma.reportCategories.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: "Kategori berhasil dihapus" });
  } catch (error: any) {
    if (error.code === "P2003") {
      return NextResponse.json(
        {
          message:
            "Kategori tidak bisa dihapus karena masih digunakan oleh beberapa laporan.",
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "Gagal menghapus kategori" },
      { status: 500 },
    );
  }
}
