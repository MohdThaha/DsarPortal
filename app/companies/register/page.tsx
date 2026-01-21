"use client"

import { useState } from "react"

export default function CompanyRegisterPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    // 1️⃣ Upload logo
    const logoRes = await fetch("/api/upload/logo", {
      method: "POST",
      body: formData,
    })
    const logoData = await logoRes.json()

    if (!logoRes.ok) {
      alert(logoData.error)
      setLoading(false)
      return
    }

    // 2️⃣ Register company
    const res = await fetch("/api/companies/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
        companyName: formData.get("companyName"),
        address: formData.get("address"),
        phone: formData.get("phone"),
        employees: Number(formData.get("employees")),
        fieldOfWork: formData.get("fieldOfWork"),
        region: formData.get("region"),
        logoUrl: logoData.url,
      }),
    })

    const data = await res.json()
    alert(data.message)
    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Register Your Company</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="companyName" placeholder="Company Name" required className="input" />
        <input name="email" type="email" placeholder="Owner Email" required className="input" />
        <input name="password" type="password" placeholder="Password" required className="input" />

        <input name="address" placeholder="Company Address" required className="input" />
        <input name="phone" placeholder="Phone Number" required className="input" />
        <input name="employees" type="number" placeholder="# Employees" required className="input" />
        <input name="fieldOfWork" placeholder="Field of Work / Service" required className="input" />

        <select name="region" required className="input">
          <option value="">Representation Region</option>
          <option value="EU">EU</option>
          <option value="UK">UK</option>
          <option value="EU_UK">EU & UK</option>
        </select>

        <input type="file" name="file" accept="image/*" required />

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Submitting..." : "Register Company"}
        </button>
      </form>
    </div>
  )
}
