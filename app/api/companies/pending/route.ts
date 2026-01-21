export const runtime = "nodejs"

import { NextResponse } from "next/server"
import prisma from "@/database/prisma"

export async function GET() {
  const companies = await prisma.company.findMany({
    where: { status: "pending" },
  })

  return NextResponse.json(companies)
}
