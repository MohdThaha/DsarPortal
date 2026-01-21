export const runtime = "nodejs"

import { NextResponse } from "next/server"
import prisma from "@/database/prisma"

export async function POST(req: Request) {
  const { id, status } = await req.json()

  if (!id || !status) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    )
  }

  await prisma.dsarRequest.update({
    where: { id },
    data: { status },
  })

  return NextResponse.json({ message: "Status updated" })
}
