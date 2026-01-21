"use client"

import { useState } from "react"

type Props = {
  companyId: string
  disabled?: boolean
}

export default function DsarsForm({ companyId, disabled = false }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (disabled) return

    setLoading(true)

    const formData = new FormData(e.currentTarget)

    await fetch("/api/dsar-requests", {
      method: "POST",
      body: formData,
    })

    setLoading(false)
    e.currentTarget.reset()
    alert("DSAR submitted successfully")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      {disabled && (
        <div className="p-3 text-sm bg-yellow-50 border border-yellow-200 rounded text-yellow-800">
          This company’s DSAR portal is currently inactive.
        </div>
      )}

      <input
        type="hidden"
        name="companyId"
        value={companyId}
      />

      <input
        name="fullName"
        placeholder="Full name"
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="requestType"
        placeholder="Request details"
        className="w-full border p-2 rounded"
        rows={4}
        required
      />

      <button
        disabled={disabled || loading}
        className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit DSAR"}
      </button>
    </form>
  )
}
