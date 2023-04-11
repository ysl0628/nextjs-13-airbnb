import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

interface IParams {
  reservationId?: string
}

export async function DELETE(
  req: Request,
  {
    params
  }: {
    params: IParams
  }
) {
  const { reservationId } = params
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID')
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      // 此處的 OR 條件是為了防止用戶刪除別人的預約
      // 例如：用戶 A 預約了房東 B 的房源，用戶 B 可以删除用戶 A 的預約
      // 但是用戶 A 不能删除用戶 B 的預約，但可以删除自己的預約
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }]
    }
  })

  return NextResponse.json(reservation)
}
