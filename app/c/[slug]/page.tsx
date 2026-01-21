"use client"

import { useState } from "react"

export default function PublicDsarPage({
  params,
}: {
  params: { slug: string }
}) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [details, setDetails] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage("")
    setLoading(true)

    const res = await fetch("/api/dsar-requests/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: params.slug,
        fullName,
        email,
        phone,
        details,
      }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setMessage(data.error || "Submission failed")
      return
    }

    setMessage("✅ Your DSAR request has been submitted successfully.")
    setFullName("")
    setEmail("")
    setPhone("")
    setDetails("")
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-2">
          Data Subject Access Request
        </h1>

        <p className="text-sm text-gray-600 mb-6">
          Submit a request to access, correct, or delete your personal data
          held by this company.
        </p>

        {message && (
          <p className="mb-4 text-sm font-medium">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />

          <input
            required
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />

          <input
            required
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />

          <textarea
            required
            placeholder="Request details (e.g. Access, Delete, Correction)"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={4}
            className="w-full border rounded px-3 py-2"
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit DSAR"}
          </button>
        </form>
      </div>
    </main>
  )
}
