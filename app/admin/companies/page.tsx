import prisma from "@/database/prisma"
import Link from "next/link"
import StatusDropdown from "./status-dropdown"
import { cookies } from "next/headers"

export default async function AdminCompaniesPage() {
  const role = cookies().get("dsar_role")?.value
  if (role !== "admin") return <p>Unauthorized</p>

  const companies = await prisma.company.findMany({
    include: { dsarRequests: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-7xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold">Companies</h1>

      <div className="bg-white border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Subscription</th>
              <th className="p-3 text-center">DSARs</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((c) => {
              const subscribed =
                c.subscriptionStatus === "active" ||
                c.subscriptionStatus === "trialing"

              return (
                <tr key={c.id} className="border-t">
                  <td className="p-3 font-medium">{c.name}</td>

                  <td className="p-3 text-center">
                    <StatusDropdown
                      companyId={c.id}
                      current={c.status}
                    />
                  </td>

                  <td className="p-3 text-center">
                    {subscribed ? (
                      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700 font-semibold">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700 font-semibold">
                        Inactive
                      </span>
                    )}
                  </td>

                  <td className="p-3 text-center">
                    {c.dsarRequests.length}
                  </td>

                  <td className="p-3 text-center">
                    <Link
                      href={`/admin/companies/${c.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
