"use client"

import { useState } from "react"

export default function StatusDropdown({
  dsarId,
  current,
}: {
  dsarId: string
  current: string
}) {
  const [status, setStatus] = useState(current)

  async function updateStatus(value: string) {
    setStatus(value)

    await fetch("/api/admin/dsar-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dsarId, status: value }),
    })
  }

  return (
    <select
      value={status}
      onChange={(e) => updateStatus(e.target.value)}
      className="border rounded px-2 py-1"
    >
      <option value="open">Open</option>
      <option value="in_progress">In Progress</option>
      <option value="in_review">In Review</option>
      <option value="closed">Closed</option>
    </select>
  )
}
