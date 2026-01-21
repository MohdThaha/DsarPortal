import prisma from "@/database/prisma"
import CompanySearch from "./company-search"

export default async function HomePage() {
  const companies = await prisma.company.findMany({
    where: {
      status: "approved",
      subscriptionStatus: {
        in: ["active", "trialing"],
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      fieldOfWork: true,
      region: true,
    },
    orderBy: { name: "asc" },
  })

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-14 items-start">
          
          {/* LEFT – INFO */}
          <div>
            <h1 className="text-4xl font-bold leading-tight">
              DSAR Portal
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              This portal allows individuals to submit
              <strong> Data Subject Access Requests (DSAR)</strong> under
              GDPR (EU & UK).
            </p>

            <p className="mt-4 text-gray-600">
              Search for a company to request access, deletion, or correction
              of your personal data held by that organization.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-gray-500">
              <li>• GDPR-compliant request handling</li>
              <li>• Transparent request status tracking</li>
              <li>• Secure and auditable process</li>
            </ul>
          </div>

          {/* RIGHT – SEARCH */}
          <div>
            <CompanySearch companies={companies} />
          </div>

        </div>
      </section>
    </main>
  )
}
