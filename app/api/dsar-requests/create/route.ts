export const runtime = "nodejs"

import { NextResponse } from "next/server"
import prisma from "@/database/prisma"

export async function POST(req: Request) {
  const { slug, fullName, email, requestType } = await req.json()

  if (!slug || !fullName || !email || !requestType) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    )
  }

  const company = await prisma.company.findUnique({
    where: { slug },
  })

  if (!company || company.status !== "approved") {
    return NextResponse.json(
      { error: "Company not available for DSAR requests" },
      { status: 404 }
    )
  }

  await prisma.dsarRequest.create({
    data: {
      fullName,
      email,
      requestType,
      companyId: company.id,
    },
  })

  return NextResponse.json({
    message: "DSAR request submitted successfully",
  })
}
