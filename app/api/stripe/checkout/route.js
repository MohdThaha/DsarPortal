export const runtime = "nodejs"

import { NextResponse } from "next/server"
import prisma from "@/database/prisma"
import { stripe } from "@/lib/stripe"

export async function GET() {
  const company = await prisma.company.findFirst({
    where: { status: "approved" },
  })

  if (!company) {
    return NextResponse.json({ error: "Company not found" }, { status: 404 })
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/owner/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/owner`,
    customer_email: company.email,
  })

  return NextResponse.redirect(session.url!)
}
