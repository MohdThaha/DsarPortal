import prisma from "@/database/prisma"
import Link from "next/link"

export default async function AdminCompanyPage({
  params,
}: {
  params: { id: string }
}) {
  const company = await prisma.company.findUnique({
    where: { id: params.id },
    include: { dsarRequests: true },
  })

  if (!company) return <p>Company not found</p>

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold">{company.name}</h1>

      <div className="bg-white border rounded p-6 space-y-2">
        <p><strong>Field:</strong> {company.fieldOfWork}</p>
        <p><strong>Employees:</strong> {company.employees}</p>
        <p><strong>Region:</strong> {company.region}</p>
        <p><strong>Status:</strong> {company.status}</p>
        <p>
          <strong>Subscription:</strong>{" "}
          {company.subscriptionActive ? "Active" : "Inactive"}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Stat label="Total DSARs" value={company.dsarRequests.length} />
        <Stat label="Open" value={company.dsarRequests.filter(d => d.status === "open").length} />
        <Stat label="In Review" value={company.dsarRequests.filter(d => d.status === "in_review").length} />
        <Stat label="Closed" value={company.dsarRequests.filter(d => d.status === "closed").length} />
      </div>

      <Link
        href={`/admin/dsars?company=${company.id}`}
        className="inline-block px-5 py-3 bg-black text-white rounded"
      >
        View DSARs for this Company
      </Link>
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
