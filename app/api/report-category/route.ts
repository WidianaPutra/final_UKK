import { z } from "zod";
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export const CategorySchema = z.object({
  name: z.string().min(1, "Nama kategori tidak boleh kosong").max(50),
});

const UpdateCategorySchema = CategorySchema.partial();

export async function GET() {
  try {
    const categories = await prisma.reportCategories.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { reports: true },
        },
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mengambil data kategori" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = CategorySchema.parse(body);

    const newCategory = await prisma.reportCategories.create({
      data: validatedData,
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Gagal membuat kategori" },
      { status: 500 },
    );
  }
}
