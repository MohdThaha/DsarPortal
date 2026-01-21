import prisma from "@/database/prisma"
import { cookies } from "next/headers"
import DsarsTable from "../dsars-table"
import Link from "next/link"

export default async function OwnerDsarsPage() {
  const role = cookies().get("dsar_role")?.value
  const userId = cookies().get("dsar_user_id")?.value

  if (role !== "owner" || !userId) {
    return <p>Unauthorized</p>
  }

  const company = await prisma.company.findUnique({
    where: { ownerId: userId },
    include: { dsarRequests: true },
  })

  if (!company) return <p>No company found.</p>

  const stats = {
    total: company.dsarRequests.length,
    open: company.dsarRequests.filter(d => d.status === "open").length,
    in_progress: company.dsarRequests.filter(d => d.status === "in_progress").length,
    in_review: company.dsarRequests.filter(d => d.status === "in_review").length,
    closed: company.dsarRequests.filter(d => d.status === "closed").length,
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">DSAR Requests</h1>
        <Link href="/owner" className="text-sm underline">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Stat label="Total" value={stats.total} />
        <Stat label="Open" value={stats.open} />
        <Stat label="In Progress" value={stats.in_progress} />
        <Stat label="In Review" value={stats.in_review} />
        <Stat label="Closed" value={stats.closed} />
      </div>

      {/* DSAR Table */}
      <DsarsTable dsars={company.dsarRequests} />
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border rounded p-4 text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  )
}
