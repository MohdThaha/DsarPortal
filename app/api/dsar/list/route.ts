export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import prisma from "@/database/prisma"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const page = Number(searchParams.get("page") ?? 1)
  const status = searchParams.get("status")
  const take = 10
  const skip = (page - 1) * take

  const role = cookies().get("dsar_role")?.value
  const userId = cookies().get("dsar_user")?.value

  if (!role) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const where: any = {}
  if (status) where.status = status

  // OWNER: only their company
  if (role === "owner") {
    const company = await prisma.company.findFirst({
      where: { ownerId: userId },
    })
    if (!company) return NextResponse.json([])
    where.companyId = company.id
  }

  const [data, total] = await Promise.all([
    prisma.dsarRequest.findMany({
      where,
      include: {
        company: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.dsarRequest.count({ where }),
  ])

  return NextResponse.json({
    data,
    pagination: {
      page,
      total,
      pages: Math.ceil(total / take),
    },
  })
}
