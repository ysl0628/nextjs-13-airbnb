import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'

export async function POST(req: Request, res: Response) {
  const body = await req.json()
  const { name, email, password } = body

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword
    }
  })

  return NextResponse.json(user)
}
