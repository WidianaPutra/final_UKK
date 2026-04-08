import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const admins = await prisma.admin.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        birthday: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ data: admins });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, phone, birthday } = body;

    const existingAdmin = await prisma.admin.findUnique({ where: { email } });
    if (existingAdmin) {
      return NextResponse.json(
        { message: "Email sudah digunakan" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        birthday: new Date(birthday),
      },
    });

    return NextResponse.json(
      { message: "Admin berhasil dibuat", data: newAdmin },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal membuat admin" },
      { status: 500 },
    );
  }
}
