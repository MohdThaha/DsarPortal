export const runtime = "nodejs"

import { NextResponse } from "next/server"
import prisma from "@/database/prisma"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  const role = cookies().get("dsar_role")?.value

  if (!role || (role !== "admin" && role !== "owner")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { dsarId, status } = await req.json()

  if (!dsarId || !status) {
    return NextResponse.json(
      { error: "Missing dsarId or status" },
      { status: 400 }
    )
  }

  await prisma.dsarRequest.update({
    where: { id: dsarId },
    data: { status },
  })

  return NextResponse.json({ success: true })
}
