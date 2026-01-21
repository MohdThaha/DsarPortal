import "./globals.css"
import Link from "next/link"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {/* Top Navigation */}
        <header className="border-b bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/" className="font-bold text-lg">
              DSAR Portal
            </Link>

            <nav className="space-x-4 text-sm">
              <Link href="/companies/register" className="hover:underline">
                Register Company
              </Link>
              <Link href="/auth/login" className="hover:underline">
                Admin / Company Login
              </Link>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="px-4">{children}</main>

        {/* Footer */}
        <footer className="mt-16 border-t bg-white">
          <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">
            DSAR Portal — GDPR Data Subject Access Request Management
          </div>
        </footer>
      </body>
    </html>
  )
}
