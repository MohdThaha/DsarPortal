import prisma from "@/database/prisma"
import { cookies } from "next/headers"
import Link from "next/link"

export default async function AdminCompanyDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const role = cookies().get("dsar_role")?.value
  if (role !== "admin") return <p>Unauthorized</p>

  const company = await prisma.company.findUnique({
    where: { id: params.id },
    include: {
      dsarRequests: true,
      owner: true,
    },
  })

  if (!company) {
    return <p className="p-10">Company not found</p>
  }

  const isSubscribed =
    company.subscriptionStatus === "active" ||
    company.subscriptionStatus === "trialing"

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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{company.name}</h1>
        <Link href="/admin/companies" className="text-sm underline">
          ← Back to Companies
        </Link>
      </div>

      {/* Company Info */}
      <div className="bg-white border rounded p-6 space-y-3">
        <p><strong>Email:</strong> {company.email}</p>
        <p><strong>Phone:</strong> {company.phone}</p>
        <p><strong>Field:</strong> {company.fieldOfWork}</p>
        <p><strong>Employees:</strong> {company.employees}</p>
        <p><strong>Region:</strong> {company.region}</p>
        <p><strong>Status:</strong> {company.status}</p>
        <p>
          <strong>Subscription:</strong>{" "}
          {isSubscribed ? (
            <span className="text-green-600 font-semibold">Active</span>
          ) : (
            <span className="text-red-600 font-semibold">Inactive</span>
          )}
        </p>
      </div>

      {/* DSAR Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Stat label="Total" value={stats.total} />
        <Stat label="Open" value={stats.open} />
        <Stat label="In Progress" value={stats.in_progress} />
        <Stat label="In Review" value={stats.in_review} />
        <Stat label="Closed" value={stats.closed} />
      </div>

      {/* DSAR Table */}
      <div className="bg-white border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Created</th>
            </tr>
          </thead>
          <tbody>
            {company.dsarRequests.map(dsar => (
              <tr key={dsar.id} className="border-t">
                <td className="p-3">{dsar.fullName}</td>
                <td className="p-3">{dsar.email}</td>
                <td className="p-3 text-center">{dsar.status}</td>
                <td className="p-3 text-center">
                  {new Date(dsar.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
