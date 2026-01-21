import prisma from "@/database/prisma"
import { redirect } from "next/navigation"

export default async function OwnerSuccessPage() {
  await prisma.company.updateMany({
    where: {
      status: "approved",
    },
    data: {
      subscriptionStatus: "active",
      subscriptionEndsAt: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000 // +30 days
      ),
    },
  })

  redirect("/owner")
}
