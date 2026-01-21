export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import prisma from "@/database/prisma"

export async function POST(req: Request) {
  const role = cookies().get("dsar_role")?.value
  if (role !== "owner") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { dsarId, status } = await req.json()

  if (!dsarId || !status) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  await prisma.dsarRequest.update({
    where: { id: dsarId },
    data: { status },
  })

  return NextResponse.json({ message: "Status updated" })
}
