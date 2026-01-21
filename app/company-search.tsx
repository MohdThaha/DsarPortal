"use client"

import { useState } from "react"
import Link from "next/link"

type Company = {
  id: string
  name: string
  slug: string
  fieldOfWork: string
  region: string
}

export default function CompanySearch({
  companies,
}: {
  companies: Company[]
}) {
  const [query, setQuery] = useState("")

  const isSearching = query.trim().length > 0

  const filteredCompanies = isSearching
    ? companies.filter(company =>
        company.name.toLowerCase().includes(query.toLowerCase())
      )
    : companies // ✅ show all when empty

  return (
    <div className="space-y-6">
      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search company name…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full p-4 border rounded-lg text-base
                   focus:outline-none focus:ring-2 focus:ring-black"
      />

      {/* RESULT COUNT (only when typing) */}
      {isSearching && (
        <div className="text-sm text-gray-500">
          {filteredCompanies.length} result
          {filteredCompanies.length !== 1 && "s"} found
        </div>
      )}

      {/* RESULTS */}
      <div className="space-y-3 max-h-[420px] overflow-y-auto">
        {/* No results ONLY when typing */}
        {isSearching && filteredCompanies.length === 0 && (
          <div className="bg-white border rounded p-6 text-center text-gray-500">
            No matching companies found.
          </div>
        )}

        {filteredCompanies.map(company => (
          <Link
            key={company.id}
            href={`/companies/${company.slug}`}
            className="block bg-white border rounded-lg p-5
                       hover:border-black transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">
                  {company.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {company.fieldOfWork}
                </p>
              </div>

              <span className="text-xs px-3 py-1 border rounded-full">
                {company.region}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
