import prisma from "@/database/prisma"
import { cookies } from "next/headers"
import StatusDropdown from "./status-dropdown"

export default async function AdminDsarsPage({
  searchParams,
}: {
  searchParams?: { company?: string }
}) {
  const role = cookies().get("dsar_role")?.value
  if (role !== "admin") return <p>Unauthorized</p>

  const companyId = searchParams?.company

  const dsars = await prisma.dsarRequest.findMany({
    where: companyId ? { companyId } : {},
    include: {
      company: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">All DSAR Requests</h1>

      {dsars.length === 0 ? (
        <p>No DSAR requests found.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Company</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Created</th>
            </tr>
          </thead>
          <tbody>
            {dsars.map((d) => (
              <tr key={d.id}>
                <td className="p-2 border">{d.fullName}</td>
                <td className="p-2 border">{d.email}</td>
                <td className="p-2 border">{d.company.name}</td>
                <td className="p-2 border">{d.requestType}</td>
                <td className="p-2 border">
                  <StatusDropdown dsarId={d.id} current={d.status} />
                </td>
                <td className="p-2 border">
                  {new Date(d.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
