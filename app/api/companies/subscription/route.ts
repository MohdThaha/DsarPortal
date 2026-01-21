// app/api/companies/subscription/route.ts
export const runtime = "nodejs"

import { NextResponse } from "next/server"
import prisma from "@/database/prisma"
import { cookies } from "next/headers"

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
    },
  })

  return NextResponse.json({
    message: "Mock subscription activated",
  })
}
