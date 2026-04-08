import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const admin = await prisma.admin.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        birthday: true,
      },
    });

    if (!admin)
      return NextResponse.json(
        { message: "Admin tidak ditemukan" },
        { status: 404 },
      );

    return NextResponse.json({ data: admin });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const { id } = await params;
    const { name, email, password, phone, birthday } = body;

    const updateData: any = {
      name,
      email,
      phone,
      birthday: new Date(birthday),
    };

    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      message: "Admin berhasil diperbarui",
      data: updatedAdmin,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal memperbarui admin" },
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

    await prisma.admin.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Admin berhasil dihapus" });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menghapus admin" },
      { status: 500 },
    );
  }
}
