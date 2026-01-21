export const runtime = "nodejs"

import { NextResponse } from "next/server"
import prisma from "@/database/prisma"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  const role = cookies().get("dsar_role")?.value
  if (role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const { companyId, status } = await req.json()

  if (!companyId || !status) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    )
  }

  await prisma.company.update({
    where: { id: companyId },
    data: { status },
  })

  return NextResponse.json({ success: true })
}
