export const runtime = "nodejs"

import { NextResponse } from "next/server"
import prisma from "@/database/prisma"

export async function POST(req: Request) {
  const form = await req.formData()

  const id = form.get("id") as string

  await prisma.company.update({
    where: { id },
    data: {
      name: form.get("name") as string,
      fieldOfWork: form.get("fieldOfWork") as string,
      employees: Number(form.get("employees")),
    },
  })

  return NextResponse.redirect(
    new URL("/owner", req.url)
  )
}
