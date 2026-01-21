export const runtime = "nodejs"

import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import prisma from "@/database/prisma"

export async function GET() {
  const adminEmail = "admin@dsarportal.com"
  const adminPassword = "Admin@123"

  const existing = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (existing) {
    return NextResponse.json({
      message: "Admin already exists",
    })
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    },
  })

  return NextResponse.json({
    message: "Admin seeded successfully",
    email: adminEmail,
    password: adminPassword,
  })
}
