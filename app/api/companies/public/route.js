export const runtime = "nodejs"

import { NextResponse } from "next/server"
import prisma from "@/database/prisma"

export async function GET() {
  const companies = await prisma.company.findMany({
    where: { status: "approved" },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  })

  return NextResponse.json(companies)
}
