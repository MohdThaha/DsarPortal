"use client"

import { useState } from "react"

export default function DSARPage({
  params,
}: {
  params: { slug: string }
}) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [requestType, setRequestType] = useState("")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage("")

    const res = await fetch("/api/dsar-requests/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: params.slug,
        fullName,
        email,
        requestType,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setMessage(data.error || "Submission failed")
      return
    }

    setMessage("✅ DSAR request submitted")
    setFullName("")
    setEmail("")
    setRequestType("")
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">
        Data Subject Access Request
      </h1>

      {message && <p className="mb-3">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border px-3 py-2"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2"
        />

        <input
          placeholder="Request type (e.g. Access / Delete)"
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
          className="w-full border px-3 py-2"
        />

        <button className="w-full bg-black text-white py-2">
          Submit Request
        </button>
      </form>
    </div>
  )
}
