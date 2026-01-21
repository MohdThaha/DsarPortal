export const runtime = "nodejs"

import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import prisma from "@/database/prisma"

export async function POST(req: Request) {
  const body = await req.json()

  const {
    email,
    password,
    companyName,
    address,
    phone,
    employees,
    fieldOfWork,
    region,
    logoUrl,
  } = body

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      role: "owner",
    },
  })

  await prisma.company.create({
    data: {
      name: companyName,
      slug: companyName.toLowerCase().replace(/\s+/g, "-"),
      logoUrl,
      address,
      email,
      phone,
      employees,
      fieldOfWork,
      region,
      ownerId: user.id,
      status: "pending",
      subscriptionStatus: "inactive",
    },
  })

  return NextResponse.json({
    message: "Company registered. Awaiting admin approval.",
  })
}
