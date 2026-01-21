export const runtime = "nodejs"

import { NextResponse } from "next/server"
import prisma from "@/database/prisma"
import { cookies } from "next/headers"

export async function GET() {
  const role = cookies().get("dsar_role")?.value
  if (role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const companies = await prisma.company.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      slug: true,
      status: true,
    },
  })

  return NextResponse.json(companies)
}
