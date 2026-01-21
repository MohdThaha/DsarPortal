export const runtime = "nodejs"

import { NextResponse } from "next/server"
import prisma from "@/database/prisma"

export async function POST(req: Request) {
  const formData = await req.formData()

  const companyId = formData.get("companyId") as string
  const fullName = formData.get("fullName") as string
  const email = formData.get("email") as string
  const requestType = formData.get("requestType") as string

  if (!companyId || !fullName || !email || !requestType) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  await prisma.dsarRequest.create({
    data: {
      fullName,
      email,
      requestType,
      companyId,
    },
  })

  return NextResponse.json({ success: true })
}
