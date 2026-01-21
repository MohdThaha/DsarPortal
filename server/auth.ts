import bcrypt from "bcrypt"
import prisma from "@/database/prisma"

export async function validateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) return null

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return null

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  }
}
