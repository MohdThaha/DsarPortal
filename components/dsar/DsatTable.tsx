"use client"

import { useEffect, useState } from "react"

const STATUSES = ["open", "in_progress", "in_review", "closed"]

export default function DsarTable() {
  const [data, setData] = useState<any[]>([])
  const [status, setStatus] = useState("")
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)

  useEffect(() => {
    fetch(`/api/dsar/list?page=${page}&status=${status}`)
      .then(res => res.json())
      .then(res => {
        setData(res.data)
        setPages(res.pagination.pages)
      })
  }, [page, status])

  const updateStatus = async (id: string, newStatus: string) => {
    await fetch("/api/dsar/update-status", {
      method: "POST",
      body: JSON.stringify({ id, status: newStatus }),
    })
    location.reload()
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <select
          className="border px-2 py-1 rounded"
          onChange={e => setStatus(e.target.value)}
        >
          <option value="">All</option>
          {STATUSES.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Company</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Created</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d.id}>
              <td className="p-2 border">{d.email}</td>
              <td className="p-2 border">{d.company?.name}</td>
              <td className="p-2 border">{d.status}</td>
              <td className="p-2 border">
                {new Date(d.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2 border">
                <select
                  defaultValue={d.status}
                  onChange={e => updateStatus(d.id, e.target.value)}
                  className="border px-1 py-1"
                >
                  {STATUSES.map(s => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-2">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
          Prev
        </button>
        <span>{page} / {pages}</span>
        <button disabled={page === pages} onClick={() => setPage(p => p + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}
