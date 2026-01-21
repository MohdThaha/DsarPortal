import prisma from "@/database/prisma"

export default async function SuccessPage() {
  await prisma.company.updateMany({
    where: { status: "approved" },
    data: {
      subscriptionActive: true,
    },
  })

  return (
    <div className="max-w-md mx-auto mt-16 text-center">
      <h1 className="text-2xl font-bold mb-4">
        Subscription Activated 🎉
      </h1>
      <p>Your company DSAR page is now live.</p>
    </div>
  )
}
