"use client"

import { useEffect, useState } from "react"

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<any[]>([])

  async function loadCompanies() {
    const res = await fetch("/api/admin/companies")
    const data = await res.json()
    setCompanies(data)
  }

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/companies/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    })

    loadCompanies()
  }

  useEffect(() => {
    loadCompanies()
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Company Management
      </h1>

      <div className="space-y-4">
        {companies.map((c) => (
          <div
            key={c.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-gray-600">
                Slug: {c.slug}
              </p>
              <p className="text-xs text-gray-500">
                Status: {c.status}
              </p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => updateStatus(c.id, "approved")}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(c.id, "rejected")}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
