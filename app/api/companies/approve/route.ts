export const runtime = "nodejs"

import { NextResponse } from "next/server"
import prisma from "@/database/prisma"

export async function POST(req: Request) {
  const { companyId } = await req.json()

  await prisma.company.update({
    where: { id: companyId },
    data: { status: "approved" },
  })

  return NextResponse.json({ message: "Company approved" })
}
