"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="p-4 border-b flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/companies/register">Register Company</Link>
      <Link href="/auth/login">Login</Link>
    </nav>
  )
}
