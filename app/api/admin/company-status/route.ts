import { NextResponse } from "next/server"
import prisma from "@/database/prisma"
import { cookies } from "next/headers"
 
export const dynamic = "force-dynamic"
export const runtime = "nodejs"
 
const ALLOWED = ["pending", "approved", "rejected"] as const
 
export async function POST(req: Request) {
  const role = cookies().get("dsar_role")?.value
 
  if (role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
 
  const { companyId, status } = await req.json()
 
  if (!companyId || !status) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }
 
  if (!ALLOWED.includes(status)) {
    return NextResponse.json(
      { error: "Invalid company status" },
      { status: 400 }
    )
  }
 
  await prisma.company.update({
    where: { id: companyId },
    data: { status },
  })
 
  return NextResponse.json({ success: true })
}