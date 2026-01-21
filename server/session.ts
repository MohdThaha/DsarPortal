import { cookies } from "next/headers"

export type SessionUser = {
  id: string
  role: "admin" | "owner"
}

const SESSION_KEY = "dsar_session"

export function setSession(user: SessionUser) {
  cookies().set(SESSION_KEY, JSON.stringify(user), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  })
}

export function getSession(): SessionUser | null {
  const value = cookies().get(SESSION_KEY)?.value
  if (!value) return null
  return JSON.parse(value)
}

export function clearSession() {
  cookies().delete(SESSION_KEY)
}
