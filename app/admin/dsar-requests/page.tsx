"use client"

import { useEffect, useState } from "react"

export default function AdminDSARPage() {
  const [requests, setRequests] = useState<any[]>([])

  async function loadRequests() {
    const res = await fetch("/api/admin/dsar-requests")
    const data = await res.json()
    setRequests(data)
  }

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/dsar-requests/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    })

    loadRequests()
  }

  useEffect(() => {
    loadRequests()
  }, [])

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        DSAR Requests
      </h1>

      <div className="space-y-4">
        {requests.map((r) => (
          <div
            key={r.id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{r.fullName}</p>
              <p className="text-sm text-gray-600">{r.email}</p>
              <p className="text-sm">
                Company: <strong>{r.company.name}</strong>
              </p>
              <p className="text-sm">
                Type: {r.requestType}
              </p>
              <p className="text-xs text-gray-500">
                Status: {r.status}
              </p>
            </div>

            <select
              value={r.status}
              onChange={(e) =>
                updateStatus(r.id, e.target.value)
              }
              className="border px-3 py-2 rounded"
            >
              <option value="submitted">Submitted</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}
