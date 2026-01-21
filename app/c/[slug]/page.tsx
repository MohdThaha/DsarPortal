import prisma from "@/database/prisma"
import Image from "next/image"
import DsarsForm from "./dsar-form"

export default async function PublicCompanyPage({
  params,
}: {
  params: { slug: string }
}) {
  const company = await prisma.company.findUnique({
    where: { slug: params.slug },
  })

  if (!company) {
    return (
      <div className="max-w-3xl mx-auto mt-20 text-center">
        <h1 className="text-2xl font-bold">Company not found</h1>
      </div>
    )
  }

  const subscriptionActive =
    company.subscriptionStatus === "active" ||
    company.subscriptionStatus === "trialing"

  const isActive = company.status === "approved" && subscriptionActive

  return (
    <main className="min-h-screen bg-gray-50 py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* LEFT — COMPANY INFO */}
          <div className="bg-white border rounded-lg p-6 space-y-4">
            {company.logoUrl && (
              <Image
                src={company.logoUrl}
                alt="Company Logo"
                width={140}
                height={140}
                className="object-contain bg-gray-50 p-3 rounded"
              />
            )}

            <h1 className="text-2xl font-bold">{company.name}</h1>

            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Field:</strong> {company.fieldOfWork}</p>
              <p><strong>Employees:</strong> {company.employees}</p>
              <p><strong>Region:</strong> {company.region}</p>
              <p><strong>Contact:</strong> {company.email}</p>
            </div>

            {!isActive && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                This company’s DSAR portal is currently inactive.
              </div>
            )}

            <p className="text-sm text-gray-500 pt-4 border-t">
              Submit a Data Subject Access Request to access, correct,
              or delete your personal data held by this organization.
            </p>
          </div>

          {/* RIGHT — DSAR FORM */}
          <div className="bg-white border rounded-lg p-8">
            <DsarsForm
              companyId={company.id}
              disabled={!isActive}
            />
          </div>

        </div>
      </div>
    </main>
  )
}
