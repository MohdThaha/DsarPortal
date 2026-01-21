"use client"

import StatusSelect from "./dsars/status-select"

export default function DsarsTable({ dsars }: { dsars: any[] }) {
  if (!dsars.length) {
    return (
      <div className="bg-white border rounded p-6 text-center text-gray-500">
        No DSAR requests found.
      </div>
    )
  }

  return (
    <div className="bg-white border rounded overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Request details</th>
            <th className="p-3">Document</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {dsars.map(dsar => (
            <tr key={dsar.id} className="border-t">
              <td className="p-3">{dsar.fullName}</td>
              <td className="p-3">{dsar.email}</td>
              <td className="p-3">{dsar.requestType}</td>

              {/* DOCUMENT PREVIEW */}
              <td className="p-3">
                {dsar.documentUrl ? (
                  <a
                    href={dsar.documentUrl}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>

              <td className="p-3 capitalize">
                {dsar.status.replace("_", " ")}
              </td>

              <td className="p-3">
                <StatusSelect
                  dsarId={dsar.id}
                  current={dsar.status}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
