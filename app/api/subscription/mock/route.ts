import prisma from "@/database/prisma"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  const role = cookies().get("dsar_role")?.value
  if (role !== "owner") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const company = await prisma.company.findFirst()
  if (!company) {
    return NextResponse.json({ error: "Company not found" }, { status: 404 })
  }

  await prisma.company.update({
    where: { id: company.id },
    data: {
      subscriptionStatus: "active",
      subscriptionEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  })

  return NextResponse.json({
    message: "Mock subscription activated",
  })
}
