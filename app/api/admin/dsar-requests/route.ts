export const runtime = "nodejs"

import { NextResponse } from "next/server"
import prisma from "@/database/prisma"

export async function GET() {
  const requests = await prisma.dsarRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      company: {
        select: { name: true },
      },
    },
  })

  return NextResponse.json(requests)
}
