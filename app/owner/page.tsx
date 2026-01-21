import prisma from "@/database/prisma"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"

export default async function OwnerDashboard() {
  const role = cookies().get("dsar_role")?.value
  const userId = cookies().get("dsar_user_id")?.value

  if (role !== "owner" || !userId) {
    return <p>Unauthorized</p>
  }

  const company = await prisma.company.findUnique({
    where: { ownerId: userId },
    include: { dsarRequests: true },
  })

  if (!company) return <p>No company found</p>

  const isSubscribed =
    company.subscriptionStatus === "active" ||
    company.subscriptionStatus === "trialing"

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-8">
      <h1 className="text-3xl font-bold">Owner Dashboard</h1>

      <div className="bg-white border rounded p-6 flex gap-6">
        {company.logoUrl && (
          <Image
            src={company.logoUrl}
            alt="Company Logo"
            width={120}
            height={120}
            className="object-contain bg-gray-50 p-2 rounded"
          />
        )}

        <div className="flex-1">
          <h2 className="text-xl font-semibold">{company.name}</h2>
          <p className="text-gray-600">{company.fieldOfWork}</p>

          <div className="mt-3 text-sm space-y-1">
            <p>Status: <b>{company.status}</b></p>
            <p>
              Subscription:{" "}
              {isSubscribed ? (
                <span className="text-green-600 font-semibold">Active</span>
              ) : (
                <span className="text-red-600 font-semibold">Inactive</span>
              )}
            </p>
          </div>

          <div className="mt-4 flex gap-3">
            <Link
              href="/owner/dsars"
              className="border px-4 py-2 rounded hover:bg-gray-50"
            >
              View DSARs
            </Link>

            {!isSubscribed && (
              <form action="/api/subscription/mock" method="POST">
                <button className="bg-black text-white px-4 py-2 rounded">
                  Activate Subscription
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
