"use client"

import { useState } from "react"

type Props = {
  companyId: string
  current: "pending" | "approved" | "rejected"
}

export default function StatusDropdown({ companyId, current }: Props) {
  const [status, setStatus] = useState(current)
  const [loading, setLoading] = useState(false)

  async function updateStatus(newStatus: string) {
    setLoading(true)
    setStatus(newStatus)

    await fetch("/api/admin/company-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyId,
        status: newStatus,
      }),
    })

    setLoading(false)
  }

  return (
    <select
      value={status}
      disabled={loading}
      onChange={(e) => updateStatus(e.target.value)}
      className="border rounded px-2 py-1 text-sm"
    >
      <option value="pending">Pending</option>
      <option value="approved">Approved</option>
      <option value="rejected">Rejected</option>
    </select>
  )
}
