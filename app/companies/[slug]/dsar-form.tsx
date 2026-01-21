"use client"

import { useState } from "react"

export default function DsarsForm({ companyId }: { companyId: string }) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.append("companyId", companyId)

    const res = await fetch("/api/dsar/create", {
      method: "POST",
      body: formData,
    })

    setLoading(false)

    if (res.ok) {
      setSubmitted(true)
      form.reset()
    }
  }

  if (submitted) {
    return (
      <div className="text-center space-y-3">
        <h2 className="text-xl font-semibold">Request submitted</h2>
        <p className="text-gray-600">
          Your DSAR has been successfully submitted.
          The company will contact you if further information is required.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-xl font-semibold">
        Submit DSAR
      </h2>

      <Input label="Full Name" name="fullName" required />
      <Input label="Email" name="email" type="email" required />
      <Input label="Phone" name="phone" />

      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Upload documents (optional)
        </label>
        <input
          type="file"
          name="document"
          className="w-full text-sm"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Request details
        </label>
        <textarea
          name="requestType"
          required
          rows={4}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded hover:bg-gray-900"
      >
        {loading ? "Submitting…" : "Submit DSAR"}
      </button>
    </form>
  )
}

function Input({
  label,
  ...props
}: {
  label: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  )
}
