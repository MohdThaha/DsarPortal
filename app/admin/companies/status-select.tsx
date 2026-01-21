"use client"

import { useTransition } from "react"

export default function CompanyStatusSelect({
  id,
  currentStatus,
}: {
  id: string
  currentStatus: string
}) {
  const [isPending, startTransition] = useTransition()

  function updateStatus(status: string) {
    startTransition(async () => {
      await fetch("/api/admin/company-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
    })
  }

  return (
    <select
      disabled={isPending}
      defaultValue={currentStatus}
      onChange={(e) => updateStatus(e.target.value)}
      className="border rounded px-2 py-1 bg-white"
    >
      <option value="pending">Pending</option>
      <option value="approved">Approved</option>
      <option value="rejected">Rejected</option>
    </select>
  )
}
