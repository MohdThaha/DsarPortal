"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type Company = {
  id: string
  name: string
  slug: string
  status: string
  subscriptionStatus: string | null
}

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)

  async function loadCompanies() {
    setLoading(true)
    const res = await fetch("/api/admin/companies")
    const data = await res.json()
    setCompanies(data)
    setLoading(false)
  }

  async function updateStatus(companyId: string, status: string) {
    await fetch("/api/admin/companies/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyId, status }),
    })

    loadCompanies()
  }

  useEffect(() => {
    loadCompanies()
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Company Management
      </h1>

      {loading && <p className="text-gray-500">Loading...</p>}

      {!loading && (
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3 text-left">Company</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Subscription</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {companies.map((c) => {
                const subscribed =
                  c.subscriptionStatus === "active" ||
                  c.subscriptionStatus === "trialing"

                return (
                  <tr
                    key={c.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-gray-500">
                        /c/{c.slug}
                      </p>
                    </td>

                    {/* STATUS */}
                    <td className="p-3 text-center">
                      <select
                        value={c.status}
                        onChange={(e) =>
                          updateStatus(c.id, e.target.value)
                        }
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>

                    {/* SUBSCRIPTION */}
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

                    {/* ACTIONS */}
                    <td className="p-3 text-center space-x-3">
                      <Link
                        href={`/admin/companies/${c.id}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View
                      </Link>

                      {/* <Link
                        href={`/c/${c.slug}`}
                        target="_blank"
                        className="text-gray-600 hover:underline text-sm"
                      >
                        Public
                      </Link> */}
                    </td>
                  </tr>
                )
              })}

              {companies.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-6 text-center text-gray-500"
                  >
                    No companies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
