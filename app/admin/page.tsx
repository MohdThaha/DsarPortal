import prisma from "@/database/prisma"
import Link from "next/link"
import { cookies } from "next/headers"

export default async function AdminDashboard() {
  const role = cookies().get("dsar_role")?.value
  if (role !== "admin") return <p>Unauthorized</p>

  const [
    totalCompanies,
    pendingCompanies,
    totalDsars,
    openDsars,
    attentionCompanies,
  ] = await Promise.all([
    prisma.company.count(),
    prisma.company.count({ where: { status: "pending" } }),
    prisma.dsarRequest.count(),
    prisma.dsarRequest.count({ where: { status: "open" } }),
    prisma.company.findMany({
      where: {
        OR: [
          { status: "pending" },
          {
            status: "approved",
            subscriptionStatus: "inactive",
          },
        ],
      },
      orderBy: { createdAt: "desc" },
    }),
  ])

  return (
    <div className="max-w-6xl mx-auto mt-10 space-y-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Total Companies" value={totalCompanies} />
        <Stat label="Pending Companies" value={pendingCompanies} />
        <Stat label="Total DSARs" value={totalDsars} />
        <Stat label="Open DSARs" value={openDsars} />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4">
        <Link
          href="/admin/dsars"
          className="px-5 py-3 bg-black text-white rounded"
        >
          Manage DSARs
        </Link>

        <Link
          href="/admin/companies"
          className="px-5 py-3 border rounded"
        >
          Manage Companies
        </Link>
      </div>

      {/* ATTENTION REQUIRED SECTION */}
      <div className="bg-white border rounded p-6">
        <h2 className="text-xl font-semibold mb-4">
          Companies Requiring Attention
        </h2>

        {attentionCompanies.length === 0 ? (
          <p className="text-gray-500">No companies require action.</p>
        ) : (
          <table className="w-full border text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="border px-3 py-2 text-left">Company</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Subscription</th>
                <th className="border px-3 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {attentionCompanies.map((company) => (
                <tr key={company.id}>
                  <td className="border px-3 py-2 font-medium">
                    {company.name}
                  </td>

                  <td className="border px-3 py-2 text-center">
                    <StatusBadge status={company.status} />
                  </td>

                  <td className="border px-3 py-2 text-center">
                    <SubscriptionBadge
                      status={company.subscriptionStatus}
                    />
                  </td>

                  <td className="border px-3 py-2 text-center">
                    <Link
                      href={`/admin/companies`}
                      className="text-blue-600 hover:underline"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

/* ---------- COMPONENTS ---------- */

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border rounded p-5 text-center">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  }

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-semibold ${map[status]}`}
    >
      {status}
    </span>
  )
}

function SubscriptionBadge({ status }: { status: string }) {
  return status === "active" ? (
    <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800 font-semibold">
      Active
    </span>
  ) : (
    <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-800 font-semibold">
      Inactive
    </span>
  )
}
