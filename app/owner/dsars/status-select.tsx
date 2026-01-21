"use client"

import { useState } from "react"

const OPTIONS = ["open", "in_progress", "in_review", "closed"]

export default function StatusSelect({
  dsarId,
  current,
}: {
  dsarId: string
  current: string
}) {
  const [status, setStatus] = useState(current)
  const [loading, setLoading] = useState(false)

  async function updateStatus(value: string) {
    setStatus(value)
    setLoading(true)

    await fetch("/api/owner/dsar/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dsarId,
        status: value,
      }),
    })

    setLoading(false)
  }

  return (
    <select
      value={status}
      disabled={loading}
      onChange={e => updateStatus(e.target.value)}
      className="border rounded px-2 py-1"
    >
      {OPTIONS.map(opt => (
        <option key={opt} value={opt}>
          {opt.replace("_", " ")}
        </option>
      ))}
    </select>
  )
}
