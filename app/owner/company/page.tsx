import prisma from "@/database/prisma"

export default async function EditCompanyPage() {
  const company = await prisma.company.findFirst()

  if (!company) return <p>No company found</p>

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Company Information</h1>

      <form action="/api/owner/company-update" method="POST" className="space-y-4">
        <input type="hidden" name="id" value={company.id} />

        <input
          name="name"
          defaultValue={company.name}
          className="input"
          required
        />

        <input
          name="fieldOfWork"
          defaultValue={company.fieldOfWork}
          className="input"
          required
        />

        <input
          name="employees"
          type="number"
          defaultValue={company.employees}
          className="input"
          required
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  )
}
