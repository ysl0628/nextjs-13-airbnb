import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

import prisma from '@/app/libs/prismadb'

// getSession() returns a Promise that resolves to a session object.
// The session object contains an idToken, which is used to access resources on the server.
export async function getSession() {
  const session = await getServerSession(authOptions)

  return session
}

export default async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user?.email) return null

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      }
    })

    if (!currentUser) return null

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null
    }
  } catch (error) {
    return null
  }
}
